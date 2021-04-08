import pyrebase

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

firebase = pyrebase.initialize_app(firebaseConfig)

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

#cart data
def cart_buy(cart_data):
    try:
        email = cart_data['email']
        no_of_items_ordered = cart_data['n_items'] 
        total_cart_cost = cart_data['totalCost']
        ordered_products = cart_data['products_ordered']
        country = cart_data['country']
        name = cart_data['name']
        mobile_number = cart_data['mobile_num']
        post_cose = cart_data['post_code']
        address_1 = cart_data['address_1']
        address_2 = cart_data['address_2']
        landmark = cart_data['landmark']
        city = cart_data['city']
        state = cart_data['state']

        
            
    except:
        return False


def generateOrderID():
    last_record = db.child("customer messages").order_by_key().limit_to_last(1).get().val()
    return last_record.keys()


ans = generateOrderID()
print("".join(ans))

#contact message
def contact_msg(contact_message):
    try:
        message_email = contact_message['contact_Email']
        reason_message = contact_message['contact_Message']
        #user_name_customer = contact_message['contact_name']
        msgdata = {'customer email':message_email, 'customer message':reason_message}
        results = db.child("customer messages").push(msgdata) 

        return True
    except:
        return False