import React, { useEffect, useState } from 'react';

function MyProfile() {
    const [profileData, setProfileData] = useState(null);

    const handleLogout = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://sihire-be.vercel.app/api/users/logout/', {
                method: 'POST',
                headers: {
                    'Authorization': 'Token ' + window.localStorage.getItem("token"),
                },
            });

            if (response.ok) {
                var json_response = await response.json();
                localStorage.removeItem("token");
                console.log('Logout successful');
                window.location.href = "/login";
            } else {
                console.error('logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch('https://sihire-be.vercel.app/api/users/logged-in/', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Token ' + window.localStorage.getItem("token")
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setProfileData(data);
                } else {
                    console.error('Failed to fetch profile data');
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, []);

    const darkBlueText = {
        color: 'var(--WF-Base-800, #2D3648)',
        fontFamily: 'Inter, sans-serif',
    };

    const containerStyle = {
        backgroundColor: "#F2F2F2"
    };

    const dividerStyle = {
        borderTop: '1px solid #2D3648',
        borderBottom: '2px solid #2D3648',
        marginTop: '5px',
        marginBottom: '5px',
    };

    const profilePictureStyle = {
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        backgroundColor: '#FFFFFF',
        margin: '0 auto',
        backgroundImage: profileData?.foto ? `url(${profileData.foto})` : 'url(https://cdn-icons-png.flaticon.com/512/709/709699.png)',
        backgroundSize: 'cover',
    };

    const profileInfoStyle = {
        textAlign: 'left',
        marginTop: '20px',
    };

    return (
        <div className="container mx-auto" style={containerStyle}>
            <div className="px-5" style={{paddingTop: '20px', paddingBottom: '15px'}}>
                <h1 className="text-3xl font-bold" style={darkBlueText}>Profile</h1>
            </div>
            <hr className="divider" style={dividerStyle}></hr>
            {profileData && (
                <div className="flex flex-col items-center mt-8">
                    <div className="flex justify-center items-center space-x-4">
                        <div style={profilePictureStyle}></div>
                        <div className="flex flex-col justify-center">
                            <h6 className="font-bold text-2xl" style={darkBlueText}>{profileData.username}</h6>
                            <div style={profileInfoStyle}>
                                <p className="font-bold" style={darkBlueText}>Nama</p>
                                <p>{profileData.name}</p>
                                <p className="font-bold" style={darkBlueText}>Email</p>
                                <p>{profileData.email}</p>
                                <p className="font-bold" style={darkBlueText}>No Telpon</p>
                                <p>{profileData.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex justify-end mt-4 mr-10">
                <div className="mr-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md" style={{ background: 'var(--WF-Base-800, #2D3648)', fontSize: '1rem' }}>
                        Edit Profile
                    </button>
                </div>
                <div>
                    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-md" style={{ fontSize: '1rem' }}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MyProfile;