export interface SchemesDTO{    
        title : string;
        description:string;
        category: string;
        eligibility :string;
        documentsRequired:string;
        state:string;
    
}


export interface BrowseSchemeDTO {
    category?: string;
}

export interface SearchSchemeDTO {
    search: string;
}

export interface EligibilityDTO {
    occupation: string;
    age: number;
    income: number;
    state: string;
}
