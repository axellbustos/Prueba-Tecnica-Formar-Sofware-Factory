import React, { useContext,useEffect } from "react";
import { PokemonGalery } from "../components";
import { PokemonContext } from "../context/PokemonContext";

export const Home = () => {
  const {handleScroll } =
    useContext(PokemonContext);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
     <PokemonGalery />
    </>
  );
};
