import { DateRange } from "@angular/material/datepicker";

export interface Plan {
   fecha             : Date,
   fechasRango       : DateRange<Date>,
   actividadInicial  : string,
   cierre            : string,
   observaciones     : string,
   aprendisajes      : Aprendisajes,
   actividades       : Actividad[],
   uid               : string,
   jardinId          : string,
}

interface Actividad {
   actividad         : string,
   fecha             : Date,
   materiales?       : string[],
}

interface Aprendisajes {
   componente   : 
      'Campos de Formación Académica' | 
      'Áreas de Desarrollo Personal y Social',
   area_o_campo : string,
   organizadorCurricular   : string,
   organizadorCurricular2  : string,
   apredizajesEsperados    : string[],
}