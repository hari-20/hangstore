from flask import Flask,request,jsonify,render_template,url_for
from firebase_auth import *

app = Flask(__name__)


@app.route("/")
def home():
    return render_template('index.html')

@app.route("/product-page")
def products_page():
    return render_template('product.html')

@app.route("/cart-page")
def cart_page():
    return render_template('shoping-cart.html')
    
@app.route("/usersignup", methods=['POST'])
def user_signup():
    if request.method == "POST":
        try:
            user_data = request.get_json()
            u_id = user_data['email']
            u_pass = user_data['pwd']
            signup_res = signup(u_id, u_pass) #signup authentication using firebase

            if(signup_res == True):
                return jsonify({"result":"mail sent"})
            
            elif(signup_res == "exists"):
                return jsonify({"result":"Account already registered"})
            
            elif(signup_res == "notvalid"):
                return jsonify({"result":"notverified"})
        
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

            if signin_res == True:
                return jsonify({"result":"success"})

            elif signin_res == "notverified":
                return jsonify({"result":"notverified"})

            else:
                return jsonify({"result":"notfound"})

        except:
            return jsonify({"result":"err"})

@app.route("/user-password-reset", methods=["POST"])
def user_password_reset():
    user_data = request.get_json()
    email = user_data['email']
    reset_res = reset_password(email)

    if reset_password:
        return jsonify({"result":"mail sent"})

    else:
        return jsonify({"result":"notfound"})


if __name__ == "__main__":
    app.run( port="5500", debug=True)