import React from 'react';
import { SignInUserIcon } from '../../utils/Icons';

const AccountHandler = (props = { allowSigninText: true }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) ?? null;

  function signIn() {
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    var form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', oauth2Endpoint);

    var params = {
      client_id: import.meta.env.VITE_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_REDIRECT_URL,
      response_type: 'token',
      scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
      include_granted_scopes: 'true',
      state: 'google-auth',
    };

    for (let p in params) {
      const input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);

      form.append(input);
    }

    document.documentElement.append(form);
    form.submit();
  }

  return (
    <div className={`account ${props.allowSigninText ? 'show-signin-text' : ''}`}>
      {userInfo ? (
        <img src={userInfo.picture} />
      ) : (
        <div className="signin-button" onClick={signIn}>
          <div className="yt-icon no-hover">
            <SignInUserIcon />
          </div>

          {props.allowSigninText && <div>Sign in</div>}
        </div>
      )}
    </div>
  );
};

export default AccountHandler;
