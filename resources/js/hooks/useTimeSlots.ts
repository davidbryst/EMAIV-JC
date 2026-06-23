import { useAppStore } from '../stores/useAppStore';
import { TimeSlot } from '../types';

export const useTimeSlots = () => {
  const {
    availableSlots,
    slotsError,
    fetchAvailableSlots,
  } = useAppStore();

  // Obtenir les créneaux disponibles uniquement
  const getAvailableSlots = () => {
    return availableSlots.filter(slot => slot.disponible);
  };

  // Obtenir les créneaux consécutifs disponibles
  const getConsecutiveSlots = (count: number) => {
    const available = getAvailableSlots();
    const consecutive: TimeSlot[][] = [];

    for (let i = 0; i <= available.length - count; i++) {
      const sequence = available.slice(i, i + count);
      const isConsecutive = sequence.every((slot, index) => {
        if (index === 0) return true;
        const prevSlot = sequence[index - 1];
        const prevTime = new Date(`2000-01-01T${prevSlot.heure}:00`);
        const currentTime = new Date(`2000-01-01T${slot.heure}:00`);
        const diffMinutes = (currentTime.getTime() - prevTime.getTime()) / (1000 * 60);
        return diffMinutes === 30;
      });

      if (isConsecutive) {
        consecutive.push(sequence);
      }
    }

    return consecutive;
  };

  // Vérifier si un créneau est disponible
  const isSlotAvailable = (time: string) => {
    const slot = availableSlots.find(s => s.heure === time);
    return slot?.disponible || false;
  };

  // Obtenir les créneaux du matin (9h-12h30)
  const getMorningSlots = () => {
    return availableSlots.filter(slot => {
      const hour = parseInt(slot.heure.split(':')[0]);
      return hour >= 9 && hour <= 12;
    });
  };

  // Obtenir les créneaux de l'après-midi (14h30-16h30)
  const getAfternoonSlots = () => {
    return availableSlots.filter(slot => {
      const hour = parseInt(slot.heure.split(':')[0]);
      return hour >= 14 && hour <= 16;
    });
  };

  // Formater un créneau pour l'affichage
  const formatSlot = (slot: TimeSlot) => {
    const [h, m] = slot.heure.split(':').map(Number);
    const start = slot.heure;
    const endDate = new Date(0, 0, 0, h, m + 30);
    const end = endDate.toTimeString().slice(0, 5);
    return `${start} - ${end}`;
  };

  // Obtenir le niveau d'occupation d'un créneau
  const getSlotOccupationLevel = (slot: TimeSlot) => {
    if (slot.occupation <= 1) return 'low';
    if (slot.occupation <= 3) return 'medium';
    return 'high';
  };

  return {
    // État
    availableSlots,
    slotsError,

    // Actions
    fetchAvailableSlots,

    // Données calculées
    availableOnly: getAvailableSlots(),
    morningSlots: getMorningSlots(),
    afternoonSlots: getAfternoonSlots(),

    // Utilitaires
    getConsecutiveSlots,
    isSlotAvailable,
    formatSlot,
    getSlotOccupationLevel,
  };
};

