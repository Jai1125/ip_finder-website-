document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const ipInput = document.getElementById('ipInput');
    const ipInfo = document.getElementById('ipInfo');

    // Function to fetch IP information
    async function fetchIpInfo(ip) {
        try {
            const response = await fetch(`http://ip-api.com/json/${ip}`);
            const data = await response.json();
            displayIpInfo(data);
        } catch (error) {
            ipInfo.innerHTML = `<p>Error fetching IP information.</p>`;
        }
    }

    // Function to display IP information
    function displayIpInfo(data) {
        if (data.status === 'fail') {
            ipInfo.innerHTML = `<p>Invalid IP address or unable to retrieve information.</p>`;
            return;
        }

        ipInfo.innerHTML = `
            <h2>IP Information</h2>
            <p><strong>IP:</strong> ${data.query}</p>
            <p><strong>Country:</strong> ${data.country}</p>
            <p><strong>Region:</strong> ${data.regionName}</p>
            <p><strong>City:</strong> ${data.city}</p>
            <p><strong>ZIP:</strong> ${data.zip}</p>
            <p><strong>ISP:</strong> ${data.isp}</p>
            <p><strong>Organization:</strong> ${data.org}</p>
            <p><strong>AS:</strong> ${data.as}</p>
        `;
    }

    // Event listener for the search button
    searchBtn.addEventListener('click', () => {
        const ip = ipInput.value.trim();
        if (ip) {
            fetchIpInfo(ip);
        } else {
            ipInfo.innerHTML = `<p>Please enter an IP address.</p>`;
        }
    });

    // Automatically fetch your own IP information on page load
    fetchIpInfo('');
});
