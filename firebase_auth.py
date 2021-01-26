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
auth = firebase.auth()  #Firebase authentication
db = firebase.database()   #Firebase database


def signup(email, password, u_name, mobile_num): 
    try:
        create_user = auth.create_user_with_email_and_password(email, password)
    except:
        return "exists"

    try:
        # user token expires every 1 hour:
        create_user = auth.refresh(create_user['refreshToken'])
        
        verify_mail = auth.send_email_verification(create_user['idToken']) #send email verification
        user_info = auth.get_account_info(create_user['idToken']) #Fetching Account info for localId
        
        uId = user_info['users'][0]['localId'] #localId
        data = {'email':email, 'username':u_name, 'mobile': str(mobile_num)}
        results = db.child("customer").child(uId).set(data) #Storing userdata to firebase realtime database

        if(verify_mail['kind']!= None):
            return True
        else:
            return "notvalid"
    except:
        return "err"

def signin(email, password):
    try:
        user = auth.sign_in_with_email_and_password(email, password)
        # user token expires every 1 hour:
        user = auth.refresh(user['refreshToken'])
        user_info = auth.get_account_info(user['idToken'])
        emailVerified = user_info['users'][0]['emailVerified']
        if emailVerified == True:
            uId = user_info['users'][0]['localId']
            user_name = db.child("customer").child(uId).child("username").get().val()
            return user_name
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

