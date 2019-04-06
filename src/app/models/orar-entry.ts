export interface OrarEntry {
    title: string;
    acronim: string;
    description: string;
    professor: string;
    day: string;
    hour: number;
    duration: number;
    room: string;
    type: string; //curs, seminar, laborator
    grupa?: string; // mandatory la seminar / laborator, null la curs 
}
