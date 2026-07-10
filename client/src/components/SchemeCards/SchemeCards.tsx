import "./SchemeCard.css"


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
           <h3>Saraswati Cycle Yojana</h3>
            <p className="description">Financial assistance and insurance coverage for fishermen during lean periods.</p>
            <div className="tags-container">
                <span className="categoryOccupation">Farmers</span>
                <span className="categoryOther">Chhatisgarh</span>
                <span className="categoryType">Agriculture</span>
            </div>
        </div>

        
        <div className="displaycard">
            <h3>Internship Programme By The Ministry Of External Affairs</h3>
            <p className="description">Financial assistance and insurance coverage for fishermen during lean periods.</p>
            <div className="tags-container">
                <span className="categoryOccupation">Fisheries</span>
                <span className="categoryOther">Above 60</span>
                <span className="categoryType">Finance</span>
            </div>
        </div>
    </div>
    </div>
    );
}
export default SchemeCards

