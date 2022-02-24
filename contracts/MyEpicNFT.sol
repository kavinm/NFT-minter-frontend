// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// We first import some OpenZeppelin Contracts.
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

import "./Base64.sol";

contract MyEpicNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Adventurer Names", "ADC") {}

    function uint2str(uint256 _i)
        internal
        pure
        returns (string memory _uintAsString)
    {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function pickRandomBackgroundColor(uint256 tokenID)
        public
        view
        returns (string memory)
    {
        uint256 rand = random(
            string(
                abi.encodePacked(
                    "RANDOM_BACKGROUND_COLOR",
                    Strings.toString(tokenID)
                )
            )
        );
        rand = (rand % 999999) + 100000;
        while (rand > 999999) {
            rand = (rand % 999999) + 100000;
        }
        return uint2str(rand);
    }

    function pickRandomFillColor(uint256 tokenID)
        public
        view
        returns (string memory)
    {
        uint256 rand = random(
            string(
                abi.encodePacked("RANDOM_FILL_COLOR", Strings.toString(tokenID))
            )
        );
        rand = (rand % 999999) + 100000;
        while (rand > 999999) {
            rand = (rand % 999999) + 100000;
        }
        return uint2str(rand);
    }

    function pickRandomFirstName(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        // I seed the random generator. More on this in the lesson.
        uint256 rand = random(
            string(abi.encodePacked("FIRST_NAME", Strings.toString(tokenId)))
        );
        // Squash the # between 0 and the length of the array to avoid going out of bounds.
        rand = rand % firstNames.length;
        return firstNames[rand];
    }

    function pickRandomLastName(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        // I seed the random generator. More on this in the lesson.
        uint256 rand = random(
            string(abi.encodePacked("LAST_NAME", Strings.toString(tokenId)))
        );
        // Squash the # between 0 and the length of the array to avoid going out of bounds.
        rand = rand % lastNames.length;
        return lastNames[rand];
    }

    function pickRandomClass(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        // I seed the random generator. More on this in the lesson.
        uint256 rand = random(
            string(abi.encodePacked("CLASS", Strings.toString(tokenId)))
        );
        // Squash the # between 0 and the length of the array to avoid going out of bounds.
        rand = rand % classNames.length;
        return classNames[rand];
    }

    event NewEpicNFTMinted(address sender, uint256 tokenId);

    string baseSvg =
        "<svg id='visual' viewBox='0 0 900 600' width='900' height='600' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1'><rect x='0' y='0' width='900' height='600' fill='#";
    string secondSvgPart = "'></rect><g fill='#";
    string thirdSvgPart =
        "'><circle r='147' cx='535' cy='542'></circle><circle r='83' cx='550' cy='120'></circle><circle r='82' cx='120' cy='111'></circle><circle r='85' cx='896' cy='428'></circle><circle r='142' cx='74' cy='527'></circle><circle r='97' cx='853' cy='56'></circle><text x='40%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle' font-size='3em'>";

    string[] firstNames = [
        "Edward ",
        "Alfred ",
        "Cordelia ",
        "Lorelei "
        "Ulric ",
        "Alastair ",
        "Atticus ",
        "Arya "
        "Charlotte "
        "Constantine ",
        "Maximus ",
        "Fedra ",
        "Casca ",
        "Nami "
    ];
    string[] lastNames = [
        "Manniv",
        "Sylestia",
        "Dushasiez",
        "Yos",
        "Yuela",
        "Ames",
        "Domos",
        "Urkensvall"
    ];
    string[] classNames = [
        ", Bard",
        ", Cleric",
        ", Fighter",
        ", Monk",
        ", Paladin",
        ", Rogue",
        ", Sorcerer",
        ", Wizard"
    ];

    function getTotalNFTsMintedSoFar() public view returns (uint256) {
        return _tokenIds.current();
    }

    function makeAnEpicNFT() public {
        //get current tokenID, starts at 0
        uint256 newItemId = _tokenIds.current();

        require(newItemId < 420, "Max Amount of 420 NFT's has been reached");
        console.log("hello");

        //generates a background color and fill color from #0000
        string memory backgroundColor = pickRandomBackgroundColor(newItemId);
        string memory fillColor = pickRandomFillColor(newItemId);

        string memory firstName = pickRandomFirstName(newItemId);
        string memory lastName = pickRandomLastName(newItemId);
        string memory className = pickRandomClass(newItemId);

        string memory characterName = string(
            abi.encodePacked(firstName, lastName, className)
        );

        string memory finalSvg = string(
            abi.encodePacked(
                baseSvg,
                backgroundColor,
                secondSvgPart,
                fillColor,
                thirdSvgPart,
                characterName,
                "</text></g></svg>"
            )
        );
        console.log("\n--------------------");
        console.log(finalSvg);
        console.log("--------------------\n");

        // Get all the JSON metadata in place and base64 encode it.
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        // We set the title of our NFT as the generated word.
                        characterName,
                        '", "description": "Character name Generation ", "image": "data:image/svg+xml;base64,',
                        // We add data:image/svg+xml;base64 and then append our base64 encode our svg.
                        Base64.encode(bytes(finalSvg)),
                        '"}'
                    )
                )
            )
        );

        // Just like before, we prepend data:application/json;base64, to our data.
        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        console.log("\n--------------------");
        console.log(finalTokenUri);
        console.log("--------------------\n");

        _safeMint(msg.sender, newItemId);

        // Update your URI!!!
        _setTokenURI(newItemId, finalTokenUri);

        _tokenIds.increment();
        console.log(
            "An NFT w/ ID %s has been minted to %s",
            newItemId,
            msg.sender
        );

        emit NewEpicNFTMinted(msg.sender, newItemId);
    }

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }
}
