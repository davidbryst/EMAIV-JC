import type { MetaFunction } from "@remix-run/node";
import About from "~/components/about";
import Comment from "~/components/comment";
import Features from "~/components/features";
import Footer from "~/components/footer";
import Header from "~/components/header";
import Hero from "~/components/hero";
import Newsletter from "~/components/newsletter";
import Realisation from "~/components/realisation";

export const meta: MetaFunction = () => {
  return [
    { title: "Emaiv jc" },
    { name: "Accueil", content: "Bienvenu chez Emaiv jc" },
  ];
};

export default function Index() {
  return (
    <div>
      <Hero />
      <About />
      <Features />
      <Realisation />
      <Comment />
      <Newsletter />
    </div>
  );
}

