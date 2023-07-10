with import <nixpkgs> { };

let
  pythonPackages = python3Packages;
in pkgs.mkShell rec {
  name = "mySteamLibraryPythonEnv";
  buildInputs = [
    pythonPackages.python
    pythonPackages.pip

    pythonPackages.pandas

    pre-commit
  ];

}
