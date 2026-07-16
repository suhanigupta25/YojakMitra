import { BrowseSchemeDTO, EligibilityDTO, SearchSchemeDTO, SchemesDTO } from "../dto/scheme.dto";
import scheme, { DisplaySchemes } from "../models/Scheme";

export class SchemeService {
    public async getSchemes(filter: BrowseSchemeDTO): Promise<SchemesDTO[]> {
        const query: Partial<BrowseSchemeDTO> = {};
        if (filter.category) {
            query.category = filter.category;
        }
        console.log(query);
        const result = await scheme.find(query);
        console.log(result);
        return result;
    }

    public async checkEligibility(filter: EligibilityDTO): Promise<SchemesDTO[]> {
        const query: any = {};

        if (filter.state) {
            query.state = {
                $regex: `^(${this.escapeRegex(filter.state)}|All India)$`,
                $options: "i"
            };
        }

        if (filter.gender && filter.gender !== "All") {
            query.gender = {
                $regex: `(${this.escapeRegex(filter.gender)}|All)`,
                $options: "i"
            };
        }

        if (filter.occupation) {
            query.occupation = {
                $regex: `(${this.escapeRegex(filter.occupation)}|Any)`,
                $options: "i"
            };
        }

        console.log(query);
        let result = await scheme.find(query);

        if (filter.age) {
            const age = Number(filter.age);
            if (!isNaN(age)) {
                result = result.filter((s: any) => this.isAgeEligible(s.ageLimit, age));
            }
        }

        return result;
    }

    public async searchSchemes(filter: SearchSchemeDTO): Promise<SchemesDTO[]> {
        const query: any = {};
        if (filter.search) {
            query.$or = [
                { name: { $regex: filter.search, $options: "i" } },
                { description: { $regex: filter.search, $options: "i" } },
                { category: { $regex: filter.search, $options: "i" } },
                { eligibility: { $regex: filter.search, $options: "i" } },
                { documentsRequired: { $regex: filter.search, $options: "i" } },
                { state: { $regex: filter.search, $options: "i" } }
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

    private escapeRegex(str: string): string {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    private isAgeEligible(ageLimitText: string, age: number): boolean {
        if (!ageLimitText) return true;
        const text = ageLimitText.toLowerCase();

        if (text.includes("no age limit")) return true;

        const plusMatch = text.match(/(\d+)\s*\+/);
        if (plusMatch) return age >= parseInt(plusMatch[1], 10);

        const rangeMatch = text.match(/(\d+)\s*-\s*(\d+)/);
        if (rangeMatch) {
            const min = parseInt(rangeMatch[1], 10);
            const max = parseInt(rangeMatch[2], 10);
            return age >= min && age <= max;
        }

        return true;
    }
}