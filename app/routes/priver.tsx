import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/header";
import Footer from "~/components/footer";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => [
  { title: "Vie privée & Conditions d’utilisation - Emaiv jc" },
  { name: "description", content: "Conditions d’utilisation, vie privée et sécurité sur EMAIV-JC." },
];

export default function Priver() {
  return (
    <div  className="max-w-3xl mx-auto px-4 py-10 mt-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Vie privée &amp; Conditions d’utilisation</h1>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Respect de la vie privée</h2>
          <p className="text-gray-700 mb-2">
            EMAIV-JC s’engage à protéger la vie privée de ses utilisateurs. Toutes les informations personnelles collectées via nos formulaires (nom, contact, informations de voyage, etc.) sont utilisées uniquement dans le cadre du traitement de votre demande de visa ou de service.
          </p>
          <p className="text-gray-700 mb-2">
            Vos données ne sont jamais revendues ni partagées à des tiers sans votre consentement, sauf obligation légale ou nécessité liée à la prestation de nos services.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Sécurité des données</h2>
          <p className="text-gray-700 mb-2">
            Nous mettons en œuvre des mesures techniques et organisationnelles pour garantir la sécurité de vos informations (chiffrement, accès restreint, etc.).
          </p>
          <p className="text-gray-700 mb-2">
            Vous pouvez demander la modification ou la suppression de vos données à tout moment en nous contactant à <Link to="mailto:contact@emaiv-jc.com" className="text-amber-600 underline text-nowrap">contact@emaiv-jc.com</Link>.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Conditions d’utilisation</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Les informations fournies sur ce site doivent être exactes et à jour.</li>
            <li>L’utilisation des services EMAIV-JC implique l’acceptation de nos conditions et de notre politique de confidentialité.</li>
            <li>Tout usage frauduleux ou tentative de nuire à la sécurité du site entraînera des poursuites.</li>
            <li>Les contenus du site sont protégés par le droit d’auteur et ne peuvent être reproduits sans autorisation.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Contact</h2>
          <p className="text-gray-700">
            Pour toute question relative à la vie privée ou à la sécurité, contactez-nous à <Link to="mailto:contact@emaiv-jc.com" className="text-amber-600 underline text-nowrap">contact@emaiv-jc.com</Link>.
          </p>
        </section>
    </div>
  );
}