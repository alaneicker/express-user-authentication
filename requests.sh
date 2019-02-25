AUTHENTICATE_USER() {
  curl --request POST \
       --header "Content-Type: application/json" \
       --data '{"username":"alaneicker","password":"Qawsed44!"}' \
       http://localhost:8080/user/authenticate
}

REQUEST_URL_WITH_TOKEN() {
  curl --request GET \
       --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTExMjQxOTB9.PA7uOU23rA1vlQPYCy8xd0brF_mVCF74Pcy-kdbTxy4' \
       http://localhost:8080/account/dashboard
}

REQUEST_URL_WITHOUT_TOKEN() {
  curl --request GET \
       http://localhost:8080/account/dashboard
}

if [ "$1" = "--auth" ]; then
    echo ""
    echo " ---------------------------------"
    echo " USER AUTHENTICATION RESPONSE"
    echo " ---------------------------------"
    echo ""
    AUTHENTICATE_USER
    echo "\n"
    echo " ---------------------------------"
    echo ""
fi

if [ "$1" = "--with-token" ]; then
    echo ""
    echo " ---------------------------------"
    echo " RESPONSE WITH TOKEN"
    echo " /account/dashboard"
    echo " ---------------------------------"
    echo ""
    REQUEST_URL_WITH_TOKEN
    echo "\n"
    echo " ---------------------------------"
    echo ""
fi

if [ "$1" = "--without-token" ]; then
    echo ""
    echo " ---------------------------------"
    echo " RESPONSE WITHOUT TOKEN"
    echo " /account/dashboard"
    echo " ---------------------------------"
    echo ""
    REQUEST_URL_WITHOUT_TOKEN
    echo "\n"
    echo " ---------------------------------"
    echo ""
fi