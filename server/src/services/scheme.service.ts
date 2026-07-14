import { BrowseSchemeDTO, EligibilityDTO, SearchSchemeDTO,SchemesDTO } from "../dto/scheme.dto";
import scheme, { DisplaySchemes } from "../models/Scheme";

export class SchemeService{
    public async getSchemes(filter :BrowseSchemeDTO):Promise<SchemesDTO[]>{
        
        const query:Partial<BrowseSchemeDTO> ={};
        if(filter.category){
            query.category=filter.category;
        }
        console.log(query);
        const result=await scheme.find(query); //breakpoint
        console.log(result);
        return result;
    }

    public async checkEligibility(query :EligibilityDTO):Promise<SchemesDTO[]>{
        const result = await scheme.find(query);
        return result;
    }

    public async searchSchemes(filter: SearchSchemeDTO): Promise<SchemesDTO[]> {

        const query: any = {};
        if (filter.search) {
            query.$or = [
                {
                    name: {
                        $regex: filter.search,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: filter.search,
                        $options: "i"
                    }
                },
                {
                    category: {
                        $regex: filter.search,
                        $options: "i"
                    }
                },
                {
                    eligibility: {
                        $regex: filter.search,
                        $options: "i"
                    }
                },
                {
                    documentsRequired: {
                        $regex: filter.search,
                        $options: "i"
                    }
                },
                {
                    state: {
                        $regex: filter.search,
                        $options: "i"
                    }
                }              

            ];

        }
        console.log(query);
        const result = await scheme.find(query);
        return result;
    }


    public async getSchemeById(id: string): Promise<DisplaySchemes | null> {
        const result = await scheme.findById(id);
        return result;
    }
    
} 