// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

contract QRareMint is ERC721, ERC721URIStorage {

    error QRareMint__OnlyOneMintAllowed();

    uint256 private _nextTokenId;

    string constant DESCRIPTION =
        "QRareMint is a customizable NFT that embeds a unique QR code for your wallet address into the artwork, providing a visual representation of your digital identity. Each NFT is generated with a one-of-a-kind design and serves as a gateway to your Web3 presence. Collect, trade, and show off your QRareMint!";

    // Mapping to store base64 SVG data for each token
    mapping(uint256 => string) private _tokenSVGs;
    mapping(address => bool) public _isMinted;

    constructor() ERC721("QRareMint", "QRM") {}

    modifier isMinted{
        require(!_isMinted[_msgSender()],QRareMint__OnlyOneMintAllowed());
        _;
    }

    function safeMint(string memory uri) public isMinted {
        uint256 tokenId = _nextTokenId++;
        _isMinted[_msgSender()] = true;
        _safeMint(_msgSender(), tokenId);
        _tokenSVGs[tokenId] = uri;
        // _setTokenURI(tokenId, uri);
    }

    function tokenURI(
        uint256 _tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        uint256 seed = uint256(uint160(_msgSender()));

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"QRareMint #',
                                Strings.toString(_tokenId),
                                '", "description":"',
                                DESCRIPTION,
                                '", ',
                                '"attributes": [{"trait_type": "seed", "value": "',
                                Strings.toString(seed),
                                '"}]',
                                ', "image":"',
                                "data:image/svg+xml;base64,",
                                _tokenSVGs[_tokenId],
                                '"}'
                            )
                        )
                    )
                )
            );
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
