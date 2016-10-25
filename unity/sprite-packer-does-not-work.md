# Sprite Packer가 동작하지 않는 현상

## Sprite Packer?
* Unity 4.6부터 UGUI제공한다.
* NGUI는 직접적으로 Atlas파일을 생성하지만 UGUI에서는 추상적으로 packing.
* UGUI에서 만들어지는 Atlas는 Library/AtalsCashe에 생성해 관리한다.

## 상황

[영상](https://www.youtube.com/watch?v=Pj8Y48ecBZY)을 따라 Atlas를 생성하려고 하였으나 **pack** 버튼을 눌러도 아무 반응이 없음.

## 해결

**Assets/Resources** 폴더 내에 있는 이미지들은 Atals를 생성할 수 없음. 이는 의도 된 것으로

Resources 폴더 내에 있는 리소스들은 빌드 시 유니티가 자동으로 가져오므로 Atlas를 생성하는 경우 두 번 불러오는 것이므로 의도적으로 막아 놓은 것

## 참조

http://gamedev.stackexchange.com/questions/75716/unity-4-5-sprite-packer-does-not-pack-images-inside-resources-folder

https://forum.unity3d.com/threads/unity-4-5-sprite-packer-does-not-pack-images-inside-resources-folder.248349/
