
// interface to interpret star data
export interface StarData {
    name: string;
    planets_number: number;
    owned_by: string;
}

export interface PlanetData {
    name: string;
    semimajor_axis: number;
    eccentricity: number;
    mass: number;
    radius: number;
    magnetic_field: string;
    albedo: number;
    rotation_period: number;
    atmospheric_pressure: number;
}