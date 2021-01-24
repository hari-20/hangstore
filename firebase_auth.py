from firebase import Firebase

firebaseConfig = {
    "apiKey": "AIzaSyArdZQf-7SrOfC3mCIVLhOcS8vwu40KHTc",
    "authDomain": "e-commerce-7a9cf.firebaseapp.com",
    "databaseURL": "https://e-commerce-7a9cf.firebaseio.com",
    "projectId": "e-commerce-7a9cf",
    "storageBucket": "e-commerce-7a9cf.appspot.com",
    "messagingSenderId": "993754537832",
    "appId": "1:993754537832:web:b9eef23dc5af2c032dc0dd",
    "measurementId": "G-JZJJ7SQ2C9"
}

firebase = Firebase(firebaseConfig)
auth = firebase.auth()

def signup(email, password):  
    try:
        create_user = auth.create_user_with_email_and_password(email, password)
    except:
        return "exists"

    try:
        # user token expires every 1 hour:
        create_user = auth.refresh(create_user['refreshToken'])
        verify_mail = auth.send_email_verification(create_user['idToken'])
        #print("email verification: ",verify_user)
        if(verify_mail['kind']!= None):
            return True
        else:
            return "notvalid"
    except:
        return "notvalid"

def signin(email, password):
    try:
        user = auth.sign_in_with_email_and_password(email, password)
        # user token expires every 1 hour:
        user = auth.refresh(user['refreshToken'])
        user_info = auth.get_account_info(user['idToken'])
        emailVerified = user_info['users'][0]['emailVerified']
        if emailVerified == True:
            return True
        else:
            return "notverified" 
    except:
        return False


def resend_mail(email, password):
    try:
        user = auth.sign_in_with_email_and_password(email, password)
        # user token expires every 1 hour:
        user = auth.refresh(user['refreshToken'])
        verify_mail = auth.send_email_verification(user['idToken'])
        #print("email verification: ",verify_user)
        if(verify_mail['kind']!= None):
            return True
        else:
            return "notvalid"
    except:
        return "notvalid"

def reset_password(email):
    try:
        user = auth.send_password_reset_email(email)
        return True
    except:
        return False