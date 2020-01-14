from chalice import Chalice, NotFoundError, Response, CORSConfig, AuthResponse, AuthRoute, CognitoUserPoolAuthorizer
from basicauth import decode

app = Chalice(app_name='todo-app')
app.debug = True

cognito_authorizer = CognitoUserPoolAuthorizer(
    'qa_test',
    header='Authorization',
    provider_arns=['arn:aws:cognito-idp:eu-west-1:299416431288:userpool/eu-west-1_YTEukGzRd']
)

cors_config = CORSConfig(
  allow_origin="*"
)




def current_user():
    auth_context = app.current_request.context.get('authorizer', {})
    return auth_context.get('claims', {}).get('cognito:username')


@app.route('/todo', authorizer=cognito_authorizer, cors=cors_config)
def todos():

    print("Current user is {}".format(current_user()))
    user = current_user().capitalize()
    test = "hallo"


    return {'test': test, 'user': user}