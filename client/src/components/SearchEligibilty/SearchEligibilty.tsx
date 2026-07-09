import "./SearchEligibilty.css"

const SearchEligibilty=()=>{
    return (
        <div>

    <section className="hero">

        <div className="hero-content">
            <h1>Find Government Schemes</h1>
            <p>
                Discover schemes based on your profile in just a few clicks.
            </p>
        </div>

       
        <div className="eligibility-card">

            <h2>Check Eligibility</h2>

            <form className="eligibility-form">

                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                        id="age"
                        type="number"
                        placeholder="Enter age"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <select id="state">
                        <option>Select State</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="occupation">Occupation</label>
                    <select id="occupation">
                        <option>Select Occupation</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="income">Annual Income</label>
                    <input
                        id="income"
                        type="number"
                        placeholder="Annual Income"
                    />
                </div>

                <button type="submit">
                    Find Schemes
                </button>

            </form>

        </div>

    </section>


    <section className="browse-section">

        <h2>Browse by Category</h2>

        <div className="category-grid">

            <div className="category-card">Healthcare</div>
            <div className="category-card">Agriculture</div>
            <div className="category-card">Housing</div>
            <div className="category-card">Employment</div>
            <div className="category-card">Startup</div>
            <div className="category-card">Education</div>
            <div className="category-card">Senior Citizen</div>
            <div className="category-card">Transgender</div>
            <div className="category-card">Finance</div>
           

        </div>

    </section>

        </div>
    );

}

export default SearchEligibilty;