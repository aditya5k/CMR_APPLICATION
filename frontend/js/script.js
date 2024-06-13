
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === sectionId) {
            section.classList.add('active');
        }
    });
}




document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        showSection(hash);
    } else {
        showSection('create-audience');
    }

 
    if (hash === 'campaigns') {
        fetchCampaigns();
    }
});


async function fetchCampaigns() {
    try {
        const response = await axios.get('/api/campaigns/');
        const data = response.data;
        const campaignList = document.getElementById('campaign-list');
        campaignList.innerHTML = data.map(campaign => `
            <li class="list-group-item">${campaign.message} (Created: ${new Date(createdAt).toLocaleDateString()})</li>
        `).join('');
    } catch (error) {
        document.getElementById('campaign-list').innerHTML = `<p>Error: ${error.message}</p>`;
    }
}


window.addEventListener('hashchange', () => {
    console.log('Hash changed:', window.location.hash);
    let hash = window.location.hash.substring(1);
    if (window.location.hash === '#/campaigns') {
        fetchCampaigns();
    } else if (window.location.hash === '#/create-audience') {
        showSection('create-audience');
    } else if (window.location.hash === '#/') {
       
        showSection('create-audience');
    }
});




document.getElementById('audience-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const spends = document.getElementById('spends').value;
    const visits = document.getElementById('visits').value;
    const noVisitMonths = document.getElementById('noVisitMonths').value;

    try {
        const response = await axios.post('https://cmr-application.onrender.com/api/audience/check', {
            spends,
            visits,
            noVisitMonths
        });
        const audienceSize = response.data.audienceSize;
        document.getElementById('audience-result').innerHTML = `
            <h3>Audience Size: ${audienceSize}</h3>
        `;
    } catch (error) {
        document.getElementById('audience-result').innerHTML = `<p>Error: ${error.message}</p>`;
    }
});


window.addEventListener('hashchange', () => {
    if (window.location.hash === '#/campaigns') {
        fetchCampaigns();
    }
});


    document.getElementById('save-continue').addEventListener('click', async () => {
        try {

                    const spends = document.getElementById('spends').value;
                    const visits = document.getElementById('visits').value;
                    const noVisitMonths = document.getElementById('noVisitMonths').value;
                    console.log(spends, visits, noVisitMonths);
        const queryParams = `spends=${spends}&visits=${visits}&noVisitMonths=${noVisitMonths}`;
        window.location.href = `dashboard.html?${queryParams}`;
        } catch (error) {
            console.error('Error creating audience:', error.message);
        }
    });

async function fetchCampaigns() {
    try {
        const response = await axios.get('/api/campaigns');
        const campaigns = response.data;
        console.log('Campaigns:', campaigns);
        
    } catch (error) {
        console.error('Error fetching campaigns:', error.message);
    }
}



