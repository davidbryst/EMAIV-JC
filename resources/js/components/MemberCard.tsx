import React, { useState } from 'react';
import { Appointment, Member } from '@/types';
import { UtilityController } from '@/controllers';
import { Eye, CalendarDays, Clock, IdCard, CheckCircle2, Users, PhoneIcon } from 'lucide-react';

interface MemberCardProps {
    member: Member;
}

export const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  return (
    <div
        className="border border-gray-200 shadow-sm rounded-lg p-2 xs:p-2.5 sm:p-3 bg-white hover:shadow transition-shadow duration-200"
        >
        <div className="flex items-center mb-2 xs:mb-2.5">
            <div className="relative">
            <img
                src={member.avatar}
                alt={`${member.prenom} ${member.nom}`}
                className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 rounded-full border border-amber-400 object-cover"
            />
            <span className="absolute bottom-0 right-0 block w-2 h-2 bg-green-400 border border-white rounded-full"></span>
            </div>
            <div className="ml-2 xs:ml-2.5 min-w-0 flex-1 flex gap-2">
            <h4 className="font-semibold text-gray-900 text-xs xs:text-sm sm:text-base truncate flex items-center gap-1">
                <Users className="w-3 h-3 text-amber-500 mr-1" />
                {`${member.prenom} ${member.nom}`}
            </h4>
            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-[10px] px-1.5 py-0.5 rounded mt-0.5">
                <span className="material-icons text-amber-500 text-xs align-middle" style={{ fontSize: '0.85rem' }}></span>
                {member.nationalite}
            </span>
            </div>
        </div>
        <div className="flex flex-wrap gap-2 xs:gap-2 sm:gap-2 text-[11px] sm:text-xs">
            <div className="flex items-center gap-1">
            <PhoneIcon className="w-3 h-3 text-amber-500" />
            <span className="font-medium text-gray-700">Téléphone :</span>

            <span className="text-gray-600 truncate">{member.telephone}</span>
            </div>
            <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4V4zm2 4v8h12V8H6zm2 2h8v4H8v-4z" />
            </svg>
            <span className="font-medium text-gray-700">Email :</span>

            <span className="text-gray-600 truncate">{member.email}</span>
            </div>
            <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M7 8h10M7 12h6" />
            </svg>
            <span className="font-medium text-gray-700">Passeport :</span>

            <span className="text-gray-600 truncate">{member.passeport}</span>
            </div>
            <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
            </svg>
            <span className="font-medium text-gray-700">Motif :</span>

            <span className="text-gray-600 truncate">{member.motif}</span>
            </div>
        </div>
        </div>
  );
};

export default MemberCard;


