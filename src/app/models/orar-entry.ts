export interface OrarEntry {
    hour: number;
    day: string;
    room: string;
    duration: number;
    type: string; //curs, seminar, laborator
    grupa?: string; // mandatory la seminar / laborator, null la curs 
}
