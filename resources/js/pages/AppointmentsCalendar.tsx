import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  Users,
  Plus,
  Filter,
  Grid,
  List,
  Eye
} from 'lucide-react';
import appointmentsRepository from '../repositories/repositoriesAppointments';
import { useDashboardHeader } from '@/contexts/dashboardHeader';



interface CalendarEvent {
  appointment: Appointment;
  startTime: string;
  endTime: string;
  date: Date;
}

const AppointmentsCalendar: React.FC = () => {
  const navigate = useNavigate();
  useDashboardHeader('Calendrier');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filterStatut, setFilterStatut] = useState<string>('');
  const [filterVisaType, setFilterStatutType] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);

  const statutOptions = ['En attente', 'Confirmé', 'Terminé', 'Annulé'];
  const visaTypeOptions = ['Touriste', 'Affaires', 'Étudiant', 'Transit', 'Famille'];

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async (): Promise<void> => {
    setLoading(true);
    try {
      const data = await appointmentsRepository.getAllAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Erreur lors du chargement des rendez-vous:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCalendarEvents = (): CalendarEvent[] => {
    const events: CalendarEvent[] = [];

    appointments.forEach(appointment => {
      if (appointment.selected_slots && Array.isArray(appointment.selected_slots)) {
        appointment.selected_slots.forEach(slot => {
          const [hours, minutes] = slot.split(':').map(Number);
          const eventDate = new Date(appointment.date);
          eventDate.setHours(hours, minutes, 0, 0);

          const endDate = new Date(eventDate);
          endDate.setMinutes(endDate.getMinutes() + 30);

          events.push({
            appointment,
            startTime: slot,
            endTime: endDate.toTimeString().slice(0, 5),
            date: eventDate
          });
        });
      }
    });

    return events.sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const getEventsForDate = (date: Date): CalendarEvent[] => {
    return getCalendarEvents().filter(event =>
      event.date.toDateString() === date.toDateString()
    );
  };

  const getEventsForWeek = (startDate: Date): CalendarEvent[] => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);

    return getCalendarEvents().filter(event =>
      event.date >= startDate && event.date <= endDate
    );
  };

  const getMonthDays = (): Date[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: Date[] = [];
    const current = new Date(startDate);

    while (current <= lastDay || current.getDay() !== 0) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const getWeekDays = (): Date[] => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      days.push(day);
    }

    return days;
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Confirmé': return 'bg-green-100 text-green-800 border-green-200';
      case 'En attente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Terminé': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Annulé': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const navigateToDetails = (appointmentId: number): void => {
    navigate(`/dashboard.tuxedos.host/${appointmentId}`);
  };

  const renderMonthView = () => {
    const days = getMonthDays();
    const weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

    return (
      <div className="bg-white rounded-lg shadow">
        {/* En-tête des jours de la semaine */}
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {weekDays.map(day => (
            <div key={day} className="bg-gray-50 p-3 text-center text-sm font-medium text-gray-700">
              {day}
            </div>
          ))}
        </div>

        {/* Grille du calendrier */}
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {days.map((date, index) => {
            const events = getEventsForDate(date);
            const isCurrentMonth = date.getMonth() === currentDate.getMonth();
            const isToday = date.toDateString() === new Date().toDateString();

            return (
              <div
                key={index}
                className={`min-h-32 bg-white p-2 ${
                  !isCurrentMonth ? 'text-gray-400' : ''
                } ${isToday ? 'bg-amber-50' : ''}`}
              >
                <div className={`text-sm font-medium mb-1 ${
                  isToday ? 'text-amber-600' : ''
                }`}>
                  {date.getDate()}
                </div>

                <div className="space-y-1">
                  {events.slice(0, 3).map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className={`text-xs p-1 rounded border cursor-pointer hover:opacity-80 transition-opacity ${getStatusColor(event.appointment.statut)}`}
                      onClick={() => navigateToDetails(event.appointment.id)}
                      title={`${event.appointment.members[0]?.prenom} ${event.appointment.members[0]?.nom} - ${event.startTime}`}
                    >
                      <div className="font-medium truncate">
                        {event.appointment.members[0]?.prenom} {event.appointment.members[0]?.nom}
                      </div>
                      <div className="text-xs opacity-75">
                        {event.startTime} - {event.appointment.visa_type}
                      </div>
                    </div>
                  ))}

                  {events.length > 3 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{events.length - 3} autres
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const days = getWeekDays();
    const events = getEventsForWeek(days[0]);

    return (
      <div className="bg-white rounded-lg shadow">
        <div className="grid grid-cols-8 gap-px bg-gray-200">
          {/* En-tête avec heures */}
          <div className="bg-gray-50 p-3">
            <div className="text-sm font-medium text-gray-700">Heures</div>
          </div>

          {days.map((date, index) => (
            <div key={index} className="bg-gray-50 p-3 text-center">
              <div className="text-sm font-medium text-gray-700">
                {date.toLocaleDateString('fr-FR', { weekday: 'short' })}
              </div>
              <div className="text-xs text-gray-500">
                {date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
              </div>
            </div>
          ))}
        </div>

        {/* Grille des heures */}
        <div className="grid grid-cols-8 gap-px bg-gray-200">
          <div className="bg-white">
            {Array.from({ length: 24 }, (_, hour) => (
              <div key={hour} className="h-12 border-b border-gray-100 flex items-center justify-center text-xs text-gray-500">
                {hour.toString().padStart(2, '0')}:00
              </div>
            ))}
          </div>

          {days.map((date, dayIndex) => (
            <div key={dayIndex} className="bg-white relative">
              {Array.from({ length: 24 }, (_, hour) => (
                <div key={hour} className="h-12 border-b border-gray-100 relative">
                  {events
                    .filter(event =>
                      event.date.toDateString() === date.toDateString() &&
                      event.date.getHours() === hour
                    )
                    .map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={`absolute left-0 right-0 mx-1 p-1 rounded text-xs cursor-pointer hover:opacity-80 transition-opacity ${getStatusColor(event.appointment.statut)}`}
                        style={{
                          top: `${(event.date.getMinutes() / 60) * 100}%`,
                          height: '30px'
                        }}
                        onClick={() => navigateToDetails(event.appointment.id)}
                        title={`${event.appointment.members[0]?.prenom} ${event.appointment.members[0]?.nom} - ${event.startTime}`}
                      >
                        <div className="font-medium truncate">
                          {event.appointment.members[0]?.prenom}
                        </div>
                        <div className="text-xs opacity-75">
                          {event.startTime}
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {selectedDate?.toLocaleDateString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </h3>
        </div>

        <div className="p-4">
          {selectedDateEvents.length > 0 ? (
            <div className="space-y-4">
              {selectedDateEvents.map((event, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${getStatusColor(event.appointment.statut)}`}
                  onClick={() => navigateToDetails(event.appointment.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">
                        {event.startTime} - {event.endTime}
                      </span>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-50">
                      {event.appointment.visa_type}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">
                      {event.appointment.members[0]?.prenom} {event.appointment.members[0]?.nom}
                    </span>
                    {event.appointment.members.length > 1 && (
                      <span className="text-xs bg-white bg-opacity-50 px-2 py-1 rounded-full">
                        +{event.appointment.members.length - 1} autre(s)
                      </span>
                    )}
                  </div>

                  <div className="text-sm opacity-75">
                    {event.appointment.telephone}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Aucun rendez-vous pour cette date</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec contrôles */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Calendrier des rendez-vous</h1>

            {/* Navigation du calendrier */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const newDate = new Date(currentDate);
                  if (viewMode === 'month') {
                    newDate.setMonth(newDate.getMonth() - 1);
                  } else if (viewMode === 'week') {
                    newDate.setDate(newDate.getDate() - 7);
                  } else {
                    newDate.setDate(newDate.getDate() - 1);
                  }
                  setCurrentDate(newDate);
                }}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-4 py-2 text-sm font-medium text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
              >
                Aujourd'hui
              </button>

              <button
                onClick={() => {
                  const newDate = new Date(currentDate);
                  if (viewMode === 'month') {
                    newDate.setMonth(newDate.getMonth() + 1);
                  } else if (viewMode === 'week') {
                    newDate.setDate(newDate.getDate() + 7);
                  } else {
                    newDate.setDate(newDate.getDate() + 1);
                  }
                  setCurrentDate(newDate);
                }}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Affichage de la date actuelle */}
            <div className="text-lg font-medium text-gray-700">
              {viewMode === 'month' && currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
              {viewMode === 'week' && `${getWeekDays()[0].toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} - ${getWeekDays()[6].toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}`}
              {viewMode === 'day' && selectedDate?.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Boutons de vue */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'month' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setViewMode('day');
                  setSelectedDate(currentDate);
                }}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  viewMode === 'day' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

            {/* Filtres */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filtres
            </button>

            {/* Nouveau rendez-vous */}
            <Link
              to="/appointments/new"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nouveau RDV
            </Link>
          </div>
        </div>

        {/* Filtres */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
              <select
                value={filterStatut}
                onChange={(e) => setFilterStatut(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="">Tous les statuts</option>
                {statutOptions.map(statut => (
                  <option key={statut} value={statut}>{statut}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type de visa</label>
              <select
                value={filterVisaType}
                onChange={(e) => setFilterStatutType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="">Tous les types</option>
                {visaTypeOptions.map(visaType => (
                  <option key={visaType} value={visaType}>{visaType}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilterStatut('');
                  setFilterStatutType('');
                }}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Effacer les filtres
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Contenu du calendrier */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
        </div>
      ) : (
        <div>
          {viewMode === 'month' && renderMonthView()}
          {viewMode === 'week' && renderWeekView()}
          {viewMode === 'day' && renderDayView()}
        </div>
      )}

      {/* Légende */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Légende</h3>
        <div className="flex flex-wrap gap-4">
          {statutOptions.map(statut => (
            <div key={statut} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(statut).split(' ')[0]}`}></div>
              <span className="text-sm text-gray-600">{statut}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsCalendar;
