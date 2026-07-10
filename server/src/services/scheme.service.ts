import { BrowseSchemeDTO, EligibilityDTO, SearchSchemeDTO } from "../dto/scheme.dto";
import scheme, { DisplaySchemes } from "../models/Scheme";

export class SchemeService{
    public async getSchemes(filter :BrowseSchemeDTO):Promise<DisplaySchemes[]>{
        
        const query:BrowseSchemeDTO ={};
        if(filter.category){
            query.category=filter.category;
        }
        const result=await scheme.find(query);
        return result;
    }

    public async checkEligibility(query :EligibilityDTO):Promise<DisplaySchemes[]>{
        const result = await scheme.find(query);
        return result;
    }

    public async searchSchemes(filter: SearchSchemeDTO): Promise<DisplaySchemes[]> {

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
        const result = await scheme.find(query);
        return result;
    }

    
    public async getSchemeById(id: string): Promise<DisplaySchemes | null> {
        const result = await scheme.findById(id);
        return result;
    }
    
} 