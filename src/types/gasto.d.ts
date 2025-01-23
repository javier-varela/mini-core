export interface Gasto {
	id: number;
	created_at: Date;
	descripcion: string;
	monto: number;
	id_empleado: number;
	id_departamento: number;
}
