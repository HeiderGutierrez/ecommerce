import React, { useState, useEffect } from "react";
import { Link, Breadcrumbs, Box } from "@mui/material";
import { useRouter } from "next/router";

const HOME_LINK_LABEL = "Productos";

export type LinkWithActive = {
  href: string;
  label: string;
  color: string;
};

export function DynamicBreadcrumbs() {
  const router = useRouter();
  const lastLevel = router.asPath.split("/").pop();


  // Obtener la ruta actual
  const currentRoute = router.asPath as string;

  // Obtener las migas de pan correspondientes
  const links = getBreadcrumbs(currentRoute);
  return (
    <Box display={"flex"} justifyContent={"flex-start"} mb={2}>
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb" separator="›">
          {links.map((link) => (
            <Link
              key={link.href}
              underline="hover"
              color={link.label === lastLevel ? "secondary" : "inherit"}
              href={link.href}
              fontSize={10}
              textTransform={"uppercase"}
            >
              {link.label}
            </Link>
          ))}
        </Breadcrumbs>
      </div>
    </Box>
  );
}

// Función para obtener las migas de pan correspondientes
function getBreadcrumbs(currentRoute: string): LinkWithActive[] {
  // Lista de migas de pan
  const links: LinkWithActive[] = [];

  // Iterar sobre la jerarquía de rutas
  const routes = currentRoute.split("/");
  for (let i = 0; i < routes.length; i++) {
    // Agregar un enlace a la lista
    links.push({
      href: `/${routes.slice(0, i + 1).join("/")}`,
      label: routes[i],
      color: "inherit",
    });
  }

  // Agregar un enlace para la ruta raíz
  if (currentRoute === "/") {
    links.unshift({
      href: "/",
      label: HOME_LINK_LABEL,
      color: "inherit",
    });
  }

  // Verificar si el texto del enlace está vacío
  // Si el texto del enlace está vacío, reemplazarlo con el valor de una constante o variable
  links.forEach((link) => {
    if (link.label === "") {
      link.label = HOME_LINK_LABEL;
    }
  });

  // Devolver la lista de migas de pan
  return links;
}
