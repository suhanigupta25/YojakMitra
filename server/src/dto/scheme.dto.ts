export interface SchemesDTO{    
        name : string;
        description:string;
        category: string;
        eligibility :string;
        documentsRequired:string;
        state:string;
        occupation:string,
        age: string;
        gender:string ;
        incomeLimit:string;   
}


export interface BrowseSchemeDTO {
    category: string;
}

export interface SearchSchemeDTO {
    search: string;
}

export interface EligibilityDTO {
    occupation?: string;
    age?: string;
    gender?:string;
    state?: string;
}
