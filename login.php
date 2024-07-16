<?php
    session_start();
    if(isset($_SESSION['S_ID'])){
      header('Location: dashboard.php');
    }
?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Acceso - Login</title>

    <!-- Custom fonts for this template-->
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link
        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">

    <!-- Custom styles for this template-->
    <link href="css/sb-admin-2.min.css" rel="stylesheet">

</head>

<body class="bg-gradient-primary">

    <div class="container">

        <!-- Outer Row -->
        <div class="row justify-content-center">

            <div class="col-xl-10 col-lg-12 col-md-9">

                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <!-- Nested Row within Card Body -->
                        <div class="row">
                            <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Bienvenido de Vuelta!</h1>
                                    </div>
                                    <form class="user">
                                        <div class="form-group">
                                            <input type="email" class="form-control form-control-user"
                                            id="txt_usuario" aria-describedby="emailHelp"
                                                placeholder="Ingresa tu Usuario...">
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control form-control-user"
                                            id="txt_contra" placeholder="Ingresa tu Contraseña">
                                        </div>
                                        <div class="form-group">
                                            <div class="custom-control custom-checkbox small">
                                                <input type="checkbox" class="custom-control-input" id="remember">
                                                <label class="custom-control-label" for="remember">Recuerdame</label>
                                            </div>
                                        </div>
                                        <a class="btn btn-primary btn-user btn-block" onclick="Iniciar_Sesion()">
                                            Ingresar
                                        </a>
                                        
                                    </form>
                                    <hr>
                                    <div class="text-center">
                                        <a class="small" href="forgot-password.php">Olvidaste la contraseña?</a>
                                    </div>
                                    <div class="text-center">
                                        <a class="small" href="register.php">Crea una Cuenta!</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap core JavaScript-->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Core plugin JavaScript-->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Sweet Alert JavaScript-->
    <script src="js/sweetalert.js"></script>

    <!-- Custom scripts for all pages-->
    <script src="js/sb-admin-2.min.js"></script>

    <!-- Custom scripts for pages that need user js-->
    <script src="js/usuario.js?rev=<?php echo time();?>"></script>

    <!-- AdminLTE App -->
  <!-- <script src="js/adminlte.min.js"></script> -->
  <!-- Chart JS -->
  <!-- <script src="utilitario/chart.js/Chart.min.js"></script> -->
  <!-- utilitario/ -->
  <script type="text/javascript" src="utilitario/DataTables/datatables.min.js"></script>

    <script>
        const rmcheck      = document.getElementById('remember'),
              usuarioInput = document.getElementById('txt_usuario'), 
              passInput    = document.getElementById('txt_contra');
        if(localStorage.checkbox && localStorage.checkbox !=""){
          rmcheck.setAttribute("checked","checked");
          usuarioInput.value= localStorage.usuario;
          passInput.value   = localStorage.pass;
        }else{
          rmcheck.removeAttribute("checked");
          usuarioInput.value= "";
          passInput.value   = "";
        }
        
      </script>

</body>

</html>