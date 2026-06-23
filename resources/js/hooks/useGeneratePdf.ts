import { useState } from 'react';
import { Appointment, Member } from '../types';
import { UtilityController } from '@/controllers';

interface UseGeneratePdfReturn {
  generatePdf: (appointment: Appointment) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

export const useGeneratePdf = (): UseGeneratePdfReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generatePdf = async (appointment: Appointment): Promise<boolean> => {
    if (!appointment || appointment.id === 0) {
      setError('Aucun rendez-vous à exporter.');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const title = `Résumé Rendez-vous #${appointment.id}`;
      const logoUrl = `${window.location.origin}/logo.png`;

      // Palette plus professionnelle : bleu marine / gris
      const statusColor = appointment.statut === 'Confirmé' ? '#0b6b4f' : appointment.statut === 'En attente' ? '#b77a00' : appointment.statut === 'Terminé' ? '#0b506f' : '#b91c1c';
      const accentColor = '#08314a';

      const membersHtml = appointment.members.map((m: Member, idx: number) => {
        const isPrimary = idx === 0;
        return `
          <tr style="background:${isPrimary ? '#fffbeb' : idx % 2 === 0 ? '#ffffff' : '#fbfafb'}">
            <td style="padding:10px;border:1px solid #e5e7eb;font-weight:${isPrimary ? '700' : '400'}">${m.prenom} ${m.nom}${isPrimary ? ' • Principal' : ''}</td>
            <td style="padding:10px;border:1px solid #e5e7eb">${m.nationalite || '—'}</td>
            <td style="padding:10px;border:1px solid #e5e7eb">${m.prefixe ?? ''} ${m.telephone ?? '—'}</td>
            <td style="padding:10px;border:1px solid #e5e7eb">${m.email || '—'}</td>
            <td style="padding:10px;border:1px solid #e5e7eb">${m.passeport ?? '—'}</td>
            <td style="padding:10px;border:1px solid #e5e7eb">${m.motif || '—'}</td>
          </tr>
        `;
      }).join('');

      const slotsHtml = (appointment.selected_slots || []).map(s => {
        const [h, mm] = s.split(':').map(Number);
        const end = new Date(0, 0, 0, h, mm + 30).toTimeString().slice(0, 5);
        return `<li style="margin-bottom:6px;padding:6px 10px;background:#f8fafc;border-radius:6px;display:inline-block;margin-right:8px">${s} → ${end}</li>`;
      }).join('');

      const html = `
        <html>
          <head>
            <title>${title}</title>
            <meta charset="utf-8" />
            <style>
              @page { size: A4 portrait; margin: 18mm }
              html, body { margin: 0; padding: 0; }
              body{font-family: Inter, 'Helvetica Neue', Arial, Helvetica, sans-serif;color:#0f172a;margin:0;background:#ffffff}

              /* content area fits inside page margins: 210mm - (2*18mm) = 174mm */
              .container{width:174mm;min-height:261mm;margin:0 auto;padding:12mm;box-sizing:border-box;background:#ffffff}

              .header{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(8,49,74,0.08);padding-bottom:12px}
              .brand{display:flex;gap:12px;align-items:center}
              .brand img{height:56px}
              .company{font-size:18px;font-weight:700;color:#08314a}
              .company small{display:block;color:#6b7280;font-size:12px}

              .meta{font-size:12px;color:#475569}
              .ref-box{background:linear-gradient(180deg,#eef7ff,#f7fbff);padding:8px 12px;border-radius:6px;border:1px solid rgba(8,49,74,0.12);text-align:right}
              .ref-code{font-family: 'Courier New', monospace;font-size:14px;letter-spacing:2px;color:#04273a}

              .section{margin-top:14px}
              .two-col{display:flex;gap:12px}
              .card{flex:1;background:#ffffff;border:1px solid rgba(8,49,74,0.06);padding:12px;border-radius:8px;box-shadow:0 1px 4px rgba(12,38,64,0.04)}

              h1{font-size:18px;color:#04273a;margin:12px 0}

              .slots{margin-top:8px}
              .slot-pill{display:inline-block;margin-right:8px;padding:6px 10px;border-radius:6px;background:#eef7ff;color:#04273a;font-size:12px;border:1px solid rgba(11,107,165,0.12)}

              table{width:100%;border-collapse:collapse;margin-top:10px;font-size:12.5px}
              thead th{background:#f3f6fb;padding:10px;border-bottom:1px solid rgba(8,49,74,0.06);color:#04273a;text-align:left}
              tbody tr:nth-child(odd){background:#ffffff}
              tbody tr:nth-child(even){background:#fbfdff}
              td{padding:10px;border-bottom:1px solid #f1f5f9;color:#04273a}
              .muted{color:#6b7280;font-size:12px}

              footer{margin-top:18px;font-size:11px;color:#6b7280;border-top:1px solid rgba(8,49,74,0.06);padding-top:10px;display:flex;justify-content:space-between}

              @media print {
                .container{padding:12mm;margin:0}
                .brand img{height:56px}
                table, thead, tbody, tr, td, th { page-break-inside: avoid }
                footer{position:relative}
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="brand">
                  <img src="${logoUrl}" alt="Emaiv JC" />
                  <div>
                    <small class="muted">Centre de demande de visa • Abidjan</small>
                  </div>
                </div>
                <div style="min-width:150px">
                  <div class="ref-box">
                    <div class="muted">Référence</div>
                    <div class="ref-code">FRV${String(appointment.id).padStart(7, '0')}</div>
                  </div>
                  <div style="margin-top:8px;text-align:right" class="muted">${UtilityController.formatDateTime(appointment.date)}</div>
                </div>
              </div>

              <h1>${title}</h1>

              <div class="section two-col">
                <div class="card">
                  <div class="muted">Informations</div>
                  <div style="margin-top:8px">
                    <div><strong>Téléphone:</strong> ${appointment.telephone || '—'}</div>
                    <div style="margin-top:6px"><strong>Type de visa:</strong> ${appointment.visa_type}</div>
                    <div style="margin-top:6px"><strong>Statut:</strong> <span style="color:${statusColor};font-weight:700">${appointment.statut}</span></div>
                    <div style="margin-top:6px"><strong>Créé le:</strong> ${new Date(appointment.created_at || appointment.date).toLocaleString('fr-FR')}</div>
                  </div>
                </div>

                <div class="card">
                  <div class="muted">Créneaux réservés</div>
                  <div class="slots">${slotsHtml || '<span class="muted">— Aucun créneau</span>'}</div>
                </div>
              </div>

              <div class="section">
                <div class="muted" style="margin-bottom:6px"><strong>Notes administratives</strong></div>
                <div style="background:#f8fafc;padding:10px;border-radius:6px;border-left:4px solid ${accentColor};">${appointment.notes || '<span class="muted">Aucune note fournie.</span>'}</div>
              </div>    

              <div class="section">
                <div class="muted" style="margin-bottom:6px"><strong>Membres (${appointment.members.length})</strong></div>
                <table>
                  <thead>
                    <tr>
                      <th>Nom complet</th>
                      <th>Nationalité</th>
                      <th>Téléphone</th>
                      <th>Email</th>
                      <th>Passeport</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${membersHtml}
                  </tbody>
                </table>
              </div>

              <footer>
                <div>Document généré le ${new Date().toLocaleString('fr-FR')}</div>
                <div class="muted">Emaiv JC • Rue des Carrossiers, Abidjan • contact@emaivjc.ci</div>
              </footer>
            </div>
          </body>
        </html>
      `;

      const w = window.open('', '_blank');
      if (!w) {
        setError('Impossible d\'ouvrir une nouvelle fenêtre. Vérifiez le bloqueur de popups.');
        return false;
      }

      w.document.open();
      w.document.write(html);
      w.document.close();
      w.focus();

      // Attendre le rendu avant d'appeler print
      setTimeout(() => {
        try { w.print(); } catch (e) { /* ignore */ }
      }, 800);

      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      setError(`Erreur lors de la génération du PDF: ${errorMessage}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generatePdf,
    isLoading,
    error
  };
};
  
  