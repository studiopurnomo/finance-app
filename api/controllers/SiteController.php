<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use app\models\LoginForm;
use yii\filters\VerbFilter;
use yii\web\Response;

class SiteController extends Controller
{
    public $enableCsrfValidation = false;
    
    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            'verbs' => [
                'class' => VerbFilter::class,
                'actions' => [
                    'login' => ['post', 'options'],
                ],
            ],
        ];
    }

    /**
     * Handle CORS preflight requests
     */
    public function actionOptions()
    {
        // CORS headers are handled in web.php response configuration
        return '';
    }

    /**
     * Login action.
     *
     * @return Response|string|array
     */
    public function actionLogin()
    {
        $model = new LoginForm();
        if ($model->load(Yii::$app->request->post(), '') && ($user = $model->login())) {
            return [
                'token' => $user->getAuthKey(),
                'user' => [
                    'id' => $user->id,
                    'username' => $user->username,
                    'email' => $user->email,
                    'full_name' => $user->full_name,
                    'premium_status' => $user->premium_status,
                ]
            ];
        }

        Yii::$app->response->statusCode = 422;
        return $model->getErrors();
    }
}
