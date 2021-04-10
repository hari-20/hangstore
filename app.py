from flask import Flask,request,jsonify,render_template,url_for
from firebase_auth import *

app = Flask(__name__)


@app.route("/")
def home():
    return render_template('index.html')

@app.route("/yourorders-page")
def your_orders_page():
    return render_template('blog.html')

@app.route("/product-page")
def products_page():
    return render_template('product.html')

@app.route("/cart-page")
def cart_page():
    return render_template('shoping-cart.html')

@app.route("/aboutus")
def about_page():
    return render_template('about.html')

@app.route("/contactus")
def contact_page():
    return render_template('contact.html')

#checkout cart fuctionality
@app.route("/checkout", methods=['POST'])
def cart_checkout():
    if request.method == "POST":
        try:
            cart_data = request.get_json()
            checkout_res = cart_buy(cart_data)
            if checkout_res:
                return jsonify({"result":"success"})
            else:
                jsonify({"result":"error"})
        except:
            return jsonify({"result":"errorder"})

#user contact message
@app.route("/contactmsgform", methods=['POST'])
def user_contactmessage():
    if request.method == "POST":
        try:
            message = request.get_json()
            message_sent = contact_msg(message)

            if(message_sent == True):
                return jsonify({"result":"message sent"})
            else:
                return jsonify({"result":"message not sent"})
        except:
            return jsonify({"result":"errcontactmessage"})

# firebase backend API    
@app.route("/usersignup", methods=['POST'])
def user_signup():
    if request.method == "POST":
        try:
            user_data = request.get_json()
            u_id = user_data['email']
            u_pass = user_data['pwd']
            u_mob = user_data['mobile']
            u_name = user_data['username']
            signup_res = signup(u_id, u_pass, u_name, u_mob) #signup authentication using firebase

            if(signup_res == True):
                return jsonify({"result":"mail sent"})
            
            elif(signup_res == "exists"):
                return jsonify({"result":"Account already registered"})
            
            elif(signup_res == "notvalid"):
                return jsonify({"result":"notvalid"})

            else:
                return jsonify({'result':"err"})
        
        except:
            return jsonify({"result":"err"})


@app.route("/usersignin", methods=["POST"])
def user_signin():
    if request.method == "POST":
        try:
            user_data = request.get_json() #signin authentication using firebase
            u_id = user_data['email']
            u_pass = user_data['pwd']
            signin_res = signin(u_id, u_pass)

            if signin_res == False:
                return jsonify({"result":"err"})

            elif signin_res == "notverified":
                return jsonify({"result":"notverified"})

            elif signin_res:
                return jsonify({"result":"success","username":signin_res})

        except:
            return jsonify({"result":"err"})

@app.route("/user-resend-verification", methods=['POST'])
def resend_verification():
    if request.method == "POST":
        try:
            user_data = request.get_json()
            email = user_data['email']
            password = user_data['pwd']
            resend_res = resend_mail(email,password)

            if resend_res == True:
                return jsonify({"result":"sent"})
            else:
                return jsonify({"result":"notvalid"})

        except:
            return jsonify({"result":"err"})

@app.route("/user-password-reset", methods=["POST"])
def user_password_reset():
    if request.method == "POST":
        user_data = request.get_json()
        email = user_data['email']
        reset_res = reset_password(email)

        if reset_res:
            return jsonify({"result":"mail sent"})

        else:
            return jsonify({"result":"notfound"})

@app.route("/savedata", methods=["POST"])
def test_store_db():
    if request.method == "POST":
        data = request.get_json()
        results = db.child("customer").push(data)

        return jsonify({"results":results})

@app.route("/retrieve-data", methods=["GET"])
def get_data():
    data = db.child("customer").get()
    print(data.val())
    return jsonify({"result":data.val()})


if __name__ == "__main__":
    app.run( port="5500", debug=True)