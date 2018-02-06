import * as THREE from 'three';

export default class webGL {
    //sample from
    //コピペで完成！Three.js入門 1
    //https://qiita.com/may88seiji/items/675577509fbd124652e5

    constructor() {
        this.renderer();
    }

    renderer(){

        // 1-1 scene オブジェクトを作成する
        const scene = new THREE.Scene();

        // 1−2 camera オブジェクト作成する
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        // 1−3 renderer オブジェクトを作成する
        let renderer = new THREE.WebGLRenderer();
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
        // camera.position.z = 30;
        camera.lookAt(scene.position);
        // 3-2 jsのappendChild関数でdiv要素に追加
        document.getElementById("WebGL-output").appendChild(renderer.domElement);
        // 3-3 rendererにsecne cameraの描画を指示する
        renderer.render(scene, camera);
    }


}
