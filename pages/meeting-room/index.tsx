import React, { useEffect, useState } from "react";
import { useControls, button } from "leva";
import RoomRender from "@/components/room-render";
import { GLTFLoader, GLTF } from "three-stdlib";
import * as THREE from "three";
type MeetingRoomProps = {};

function MeetingRoom({}: MeetingRoomProps) {
  const [modelAssets, setAsset] = useState<GLTF[]>([]);
  const [modelPos, setAssetPos] = useState<THREE.Vector3[]>([]);
  const [refreshToggle, setRefresh] = useState(false);
  const [emoteIndex, setEmoteIndex] = useState(0);
  const [emoteText, setEmoteText] = useState("");

  
  let _refresh = false;
  useEffect(() => {
    // actions[names[0]]?.reset().fadeIn(0.5).play();
  }, [modelAssets]);

  const ui_control = useControls({
    SpawnPlayer1: button((get) => {
      //TODO Spawn player

      spawnPlayer("./assets/models/Type01_Male_Idle1.glb");
    }),
    SpawnPlayer2: button((get) => {
      //TODO Spawn player

      spawnPlayer("./assets/models/Type02_Idle1.glb");
    }),
    RandomEmote: button((get) => {
      var _index = randomEmote();
      setEmoteIndex(_index||0);
      console.log("emote index",_index);
    }),
  });
  const randomEmote = () => {
    if (!modelPos) return;
    var _index = Math.random() * (modelPos.length - 0) + 0;
    return Math.floor(_index);
  };
  const spawnPlayer = (assetUrl: string) => {
    LoadModelAsset(assetUrl);
    var _pos = getRandomFloat(0, 3);
    modelPos.push(_pos);
    setAssetPos(modelPos);
    //  console.log(_pos);
  };
  const getRandomFloat = (min: number, max: number) => {
    var _posX = Math.random() * (max - min) + min;
    var _posZ = Math.random() * (max - min) + min;
    return new THREE.Vector3(_posX, 0, _posZ);
  };

  const LoadModelAsset = (assetUrl: string) => {
    THREE.Cache.enabled = true;
    var loader = new GLTFLoader();
    loader.load(assetUrl, function (gltf) {
      modelAssets.push(gltf);
      setAsset(modelAssets);
      setRefresh(!_refresh);
      _refresh = !_refresh;
      console.log(refreshToggle, gltf);
    });
  };

  return (
    <>
      <RoomRender
        modelsAvatars={modelAssets}
        modelsPositions={modelPos}
        emoteIndex={emoteIndex}
      ></RoomRender>
    </>
  );
}

export default MeetingRoom;
