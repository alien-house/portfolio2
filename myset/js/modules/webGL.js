import * as THREE from 'three';
let scene,camera,renderer;
export default class webGL {
    //sample from
    //コピペで完成！Three.js入門 1
    //https://qiita.com/may88seiji/items/675577509fbd124652e5

    constructor() {
        // renderer = null;
        this.cube = null;
        this.sphere = null;
        this.init();
    }

    init(){

        // 1-1 scene オブジェクトを作成する
        scene = new THREE.Scene();

        // 1−2 camera オブジェクト作成する
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        // 1−3 renderer オブジェクトを作成する
        // renderer = new THREE.WebGLRenderer();
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(new THREE.Color(0xEEEEEE));
        renderer.setSize(window.innerWidth, window.innerHeight);

        // 2-1 平面を作成する
        var planeGeometry = new THREE.PlaneGeometry(60, 20);
        var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);

        // 2-2 平面を傾け、位置を決める
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 15;
        plane.position.y = 0;
        plane.position.z = 0;

        // 2-3 平面を追加する
        scene.add(plane);

        // 3-1 カメラの位置 見え方を設定する
        camera.position.x = -30;
        camera.position.y = 40;
        camera.position.z = 30;
        camera.lookAt(scene.position);
        // 3-2 jsのappendChild関数でdiv要素に追加
        document.getElementById("WebGL-output").appendChild(renderer.domElement);
        // 3-3 rendererにsecne cameraの描画を指示する
        renderer.render(scene, camera);

        // 4 光源を追加する
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-20, 30, -5);
        scene.add(spotLight);

  // 5-1 cubeの作成
        var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
        var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
        this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        // 5-2 cubeの位置
        this.cube.position.x = -4;
        this.cube.position.y = 3;
        this.cube.position.z = 0;
        // 5-3 this.cubeの追加
        scene.add(this.cube);

        // 5−4 sphereの作成
        var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
        var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
        this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        // 5-5 sphereの位置
        this.sphere.position.x = 20;
        this.sphere.position.y = 0;
        this.sphere.position.z = 2;
        // 5-6 this.sphereの追加
        scene.add(this.sphere);
        renderer.shadowMap.enabled = true;
        // 6-2 影の利用
        plane.receiveShadow = true;
        // 6-3 影の利用
        this.cube.castShadow = true;
        // 6−4 影の利用
        this.sphere.castShadow = true;
        // 6−5 spotLightを影に対応させる
        spotLight.castShadow = true;

        this.render();
    }
    render() {
        console.log(renderer);
        document.getElementById("WebGL-output").appendChild(renderer.domElement);
        var step = 0;
           // 8-1 this.cubeのアニメーション
          this.cube.rotation.x += 0.02;
          this.cube.rotation.y += 0.02;
          this.cube.rotation.z += 0.02;

          // 8-2 this.sphereのアニメーション
          step += 0.04;
          this.sphere.position.x = 20 + ( 10 * (Math.cos(step)));
          this.sphere.position.y = 2 + ( 10 * Math.abs(Math.sin(step)));

        requestAnimationFrame(this.render);
        renderer.render(scene, camera);
    }

}
