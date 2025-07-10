import { useRef, useState } from "react";
import Header from "~/components/header";
import Footer from "~/components/footer";
import { FaCalendar, FaCalendarAlt } from "react-icons/fa";

export const meta = () => [
  { title: "Prendre rendez-vous - Emaiv jc" },
  { name: "description", content: "Prise de rendez-vous pour demande de visa" },
];

const visaTypes = [
  "Visa court séjour (tourisme, affaires)",
  "Visa long séjour (études, travail, regroupement familial)",
  "Visa pour mineur",
  "Autres cas particuliers",
];

const paymentMethods = [
  "Wave",
  "Orange Money",
  "MTN Mobile money",
  "Moov money",
  "Carte Visa",
];

const nationalities = [
  "Bénin",
  "Burkina Faso",
  "Cameroun",
  "Côte d'Ivoire",
  "France",
  "Mali",
  "Niger",
  "Sénégal",
  "Togo",
  // Ajoute d'autres nationalités si besoin
];

export default function RendezVous() {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    visaType: "",
    nom: "",
    prenom: "",
    nationalite: "",
    motif: "",
    dates: "",
    passeport: "",
    email: "",
    telephone: "",
    payment: "",
  });

  function dateFormat(date: string) {
    const options: Intl.DateTimeFormatOptions = { weekday: "short", year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString("fr-FR", options);
  }
    function dateFormatLong(date: string) {
      const options: Intl.DateTimeFormatOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("fr-FR", options);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    setStep(step + 1);
  }

  function handlePrev() {
    setStep(step - 1);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Ici tu peux ajouter la logique d'envoi (API, email, etc.)
    alert("Votre demande de rendez-vous a bien été envoyée !");
  }

  return (
  <div  className="max-w-7xl mx-auto p-4 my-8 flex-1 flex flex-col items-center mt-10">

        <h1 className="text-2xl font-bold mb-6 px-10 text-center ">Prendre rendez-vous pour une demande de visa</h1>
        <div className="mb-6 flex justify-center items-end gap-2 my-10 h-8">
          <span onClick={() => setStep(1)} className={`w-8 h-4 rounded hover:h-8 transition-all ${step >= 1 ? "bg-amber-500" : "bg-gray-200"}`}></span>
          <span onClick={() => setStep(2)} className={`w-8 h-4 rounded hover:h-8 transition-all ${step >= 2 ? "bg-amber-500" : "bg-gray-200"}`}></span>
          <span onClick={() => setStep(3)} className={`w-8 h-4 rounded hover:h-8 transition-all ${step >= 3 ? "bg-amber-500" : "bg-gray-200"}`}></span>
        </div>
    <div className="bg-white rounded w-full p-4 my-8 shadow h-full">
        {step === 1 && (
          <form onSubmit={handleNext} className="flex flex-col w-full gap-4">
            <label className="font-medium">Type de visa souhaité</label>
            <select
              name="visaType"
              value={form.visaType}
              onChange={handleChange}
              required
              className="border rounded-lg overflow-hidden p-2"
            >
              <option value="">Sélectionnez un type de visa</option>
              {visaTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <button type="submit" className="bg-amber-600 text-white rounded py-2 mt-4 hover:bg-amber-700 transition">Suivant</button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleNext} className="flex flex-col w-full gap-4">
            <div className="flex gap-6">
              <label>
                Nom
                <input type="text" name="nom" value={form.nom} onChange={handleChange} required className="border rounded-lg overflow-hidden p-2 w-full" />
              </label>
              <label>
                Prénom(s)
                <input type="text" name="prenom" value={form.prenom} onChange={handleChange} required className="border rounded-lg overflow-hidden p-2 w-full" />
              </label>
            </div>
            <label>Nationalité</label>
            <select
              name="nationalite"
              value={form.nationalite}
              onChange={handleChange}
              required
              className="border rounded-lg overflow-hidden p-2"
            >
              <option value="">Sélectionnez une nationalité</option>
              {nationalities.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <label>
              Motif du voyage
              <input type="text" name="motif" value={form.motif} onChange={handleChange} required className="border rounded-lg overflow-hidden p-2 w-full" />
            </label>
            <label>
              Dates de voyage prévues
                <span
                // Then in your onClick:
                onClick={() => {
                  const input = dateInputRef.current;
                  if (input) {
                    input.focus();
                    if (typeof input.showPicker === "function") {
                      input.showPicker();
                    } else {
                      input.click();
                    }
                  }
                }}
                className="text-gray-900 my-1 text-base flex justify-between items-center mb-1 p-2.5 w-full border rounded-lg overflow-hidden cursor-pointer"
                >
                {form.dates
                  ? `${dateFormatLong(form.dates)}`
                  : "Aucune date sélectionnée"}
                <FaCalendarAlt className="inline ml-10" />
                </span>
              <div className="relative">
                <input
                type="date"
                name="dates"
                ref={dateInputRef}
                value={form.dates}
                onChange={handleChange}
                required
                className="border absolute rounded-lg -translate-y-full opacity-0 overflow-hidden p-2 w-20"
                />
              </div>
            </label>
            <label>
              Numéro de passeport (si disponible)
              <input type="text" name="passeport" value={form.passeport} onChange={handleChange} className="border rounded-lg overflow-hidden p-2 w-full" />
            </label>
            <label>
              Adresse e-mail
              <input type="email" name="email" value={form.email} onChange={handleChange} required className="border rounded-lg overflow-hidden p-2 w-full" />
            </label>
            <label>
              Numéro de téléphone
              <div className="flex gap-4">
              <select
                name="telephonePrefix"
                onChange={(e) =>
                setForm({ ...form, telephone: e.target.value + form.telephone.replace(/^\+\d+\s?/, "") })
                }
              className="border rounded-lg overflow-hidden p-2"
                style={{ maxWidth: 90 }}
                defaultValue="+225"
              >
                <option value="+225">+225</option>
                <option value="+229">+229</option>
                <option value="+226">+226</option>
                <option value="+237">+237</option>
                <option value="+223">+223</option>
                <option value="+221">+221</option>
                <option value="+228">+228</option>
                {/* Ajoute d'autres préfixes si besoin */}
              </select>
              <input
                type="text"
                content="numeric"
                name="telephone"
                value={form.telephone.replace(/^\+\d+\s?/, "")}
                onChange={(e) =>
                setForm({
                  ...form,
                  telephone:
                  (form.telephone.match(/^\+\d+/)?.[0] || "+225") + " " + e.target.value,
                })
                }
                required
                className="border rounded-lg overflow-hidden p-2 w-full"
                placeholder="Numéro sans indicatif"
              />
              </div>
            </label>
            <div className="flex justify-between mt-4">
              <button type="button" onClick={handlePrev} className="bg-gray-200 rounded py-2 px-4 hover:bg-gray-300">Retour</button>
              <button type="submit" className="bg-amber-600 text-white rounded py-2 px-4 hover:bg-amber-700 transition">Suivant</button>
            </div>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
            <label className="font-medium">Paiement des frais de rendez-vous</label>
            <select
              name="payment"
              value={form.payment}
              onChange={handleChange}
              required
              className="border rounded-lg overflow-hidden p-2"
            >
              <option value="">Sélectionnez un moyen de paiement</option>
              {paymentMethods.map((method) => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
            <div className="flex justify-between mt-4">
              <button type="button" onClick={handlePrev} className="bg-gray-200 rounded py-2 px-4 hover:bg-gray-300">Retour</button>
              <button type="submit" className="bg-amber-600 text-white rounded py-2 px-4 hover:bg-amber-700 transition">Envoyer la demande</button>
            </div>
          </form>
        )}</div>
  </div>
  );
}