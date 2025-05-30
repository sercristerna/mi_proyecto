
import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const personas = [
  { nombre: "sergio", apellido: "cristerna", edad: 16 },
  { nombre: "itzel", apellido: "osuna", edad: 22 },
  { nombre: "alberto", apellido: "huerta", edad: 17 },
  { nombre: "lamine", apellido: "yamal", edad: 30 },
  { nombre: "carla", apellido: "mendoza", edad: 25 },
  { nombre: "jose", apellido: "cisneros", edad: 19 },
];

export default function TablaPersonas() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="tabla de personas">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell align="right">Edad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {personas.map((persona, index) => (
            <TableRow key={index}>
              <TableCell>{persona.nombre}</TableCell>
              <TableCell>{persona.apellido}</TableCell>
              <TableCell align="right">{persona.edad}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

