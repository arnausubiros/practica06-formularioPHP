<?php  


//echo('hola php');
//echo json_encode('hola desde PHP');



// isset — Determina si una variable está definida y no es null
// empty — Determina si una variable está vacía
// trim — Elimina espacio en blanco (u otro tipo de caracteres) del inicio y el final de la cadena

if ($_POST){
    $usuario = "";
    $correo =  "";
    $mensaje = "";


    if(isset($_POST['usuario'])){
    
        $usuario = filter_var(trim($_POST['usuario']), FILTER_SANITIZE_STRING);
        //echo json_encode('usuario en blanco');        
        //  trim($_POST['usuario']);
         
    }
      if(isset($_POST['correo'])){
    
        $correo = filter_var(trim($_POST['correo']), FILTER_VALIDATE_EMAIL);        
        //  trim($_POST['usuario']);
       // echo json_encode($usuario);       
    }

      if(isset($_POST['mensaje'])){
    
        $mensaje = filter_var(trim($_POST['mensaje']), FILTER_SANITIZE_STRING);        
        //  trim($_POST['usuario']);
       // echo json_encode($usuario);       
    }

     if(empty($usuario)){
          // echo json_encode('usuario en blanco');
          echo json_encode(array (
            'error' => true,
            'campo' => 'usuario'
          ));
          
         return;
     }
      // echo json_encode($usuario); 
       
    
       if(empty($correo)){
          // echo json_encode('correo no valido');
           echo json_encode(array (
            'error' => true,
            'campo' => 'correo'
          ));
         return;
     }


         if(empty($mensaje)){      
        // echo json_encode('mensaje en blanco');

         echo json_encode(array (
            'error' => true,
            'campo' => 'mensaje'
          ));
         return;
     }



//       //echo json_encode($correo);
//       echo json_encode(array(
//             'error' => false,
//             'campo' => 'exito'
//       ));


// }  else {
//     echo json_encode(array(
//             'error' => true,
//             'campo' => 'post'
//       ));
// }







// Cuerpo del mensaje
    $cuerpo = 'Usuario: ' . $usuario . "<br>";
    $cuerpo.= 'Email: ' . $correo . "<br>";
    $cuerpo.= 'Mensaje: ' . $mensaje . "<br>";

    // Dirección
    $destinatario = 'correoDestino@destino.com';
    $asunto = 'Mensaje de mi sitio web';

    // Para que acepte correo con HTML
    $headers  = 'MIME-Version: 1.0' . "\r\n" .'Content-type: text/html; charset=utf-8' . "\r\n" .'From: ' . $correo . "\r\n";

    if(mail($destinatario, $asunto, $cuerpo, $headers)){
        echo json_encode(array(
            'error' => false,
            'campo' => 'exito'
        ));
    }else {
        echo json_encode(array(
            'error' => true,
            'campo' => 'mail'
        ));
    }


}else {
    echo json_encode(array(
        'error' => true,
        'campo' => 'post'
    ));
    return;
}