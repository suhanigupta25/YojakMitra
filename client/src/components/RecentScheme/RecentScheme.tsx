import "./RecentScheme.css"


const SchemeCards =()=>{
    return (
    <div className="schemes-section">
    <h1>Recent Schemes Available</h1>
    
    <div className="schemes-container">
        
        <div className="displaycard">
            <h3>National Scheme Of Welfare Of Fishermen</h3>
            <p className="description">Financial assistance and insurance coverage for fishermen during lean periods.</p>
            <div className="tags-container">
                <span className="categoryOccupation">Fisheries</span>
                <span className="categoryOther">Above 60</span>
                <span className="categoryType">Finance</span>
            </div>
        </div>

        
        <div className="displaycard">
           <h3>Stand-Up India Scheme</h3>
            <p className="description">Facilitates bank loans between Rs. 10 lakh and Rs. 1 crore to at least one Scheduled Caste/Scheduled Tribe borrower and one woman borrower per bank branch for setting up a greenfield enterprise.</p>
            <div className="tags-container">
                <span className="categoryOccupation">Entrepreneur</span>
                <span className="categoryOther">18+ years</span>
                <span className="categoryType">All India</span>
            </div>
        </div>

        
        <div className="displaycard">
            <h3>Kisan Credit Card (KCC) Scheme</h3>
            <p className="description">Provides farmers with timely access to credit for crop production, post-harvest expenses, and allied agricultural activities at concessional interest rates.</p>
            <div className="tags-container">
                <span className="categoryOccupation">All India</span>
                <span className="categoryOther">18-75 year old</span>
                <span className="categoryType">Farmer</span>
            </div>
        </div>
    </div>
    </div>
    );
}
export default SchemeCards

