// Profile.js
import React from 'react';

function Profile({ user }) {
    return (
        <div>
            <h1>{user.displayName}'s Profile</h1>
            {/* Rest of the profile content */}
        </div>
    );
}

export default Profile;
