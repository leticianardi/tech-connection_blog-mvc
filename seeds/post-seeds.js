const sequelize = require('../config/connection');
const { Post } = require('../models');

const postdata = [
  {
    post_title: 'The inventor of PlayStation thinks the metaverse is pointless',
    post_content: `The man who invented PlayStation is not impressed by the metaverse.

    Ken Kutaragi, a former Sony executive who is sometimes known as the "Father of PlayStation" said in an interview with Bloomberg he doesn't see much value in the metaverse.
    
    "Being in the real world is very important, but the metaverse is about making quasi-real in the virtual world, and I can't see the point of doing it," Kutaragi said. `,
    source:
      'https://www.businessinsider.com/playstation-inventor-metaverse-pointless-2022-1',
    user_id: 1
  },
  {
    post_title:
      'Adblocking Does Not Constitute Copyright Infringement, Court Rules',
    post_content: `Axel Springer has lost its copyright infringement lawsuit against Eyeo GmbH, the company behind Adblock Plus. The German publishing house, which owns the Bild and Die Welt brands, among others, claimed that adblockers interfere with the presentation of websites in browsers, thus breaching copyright. In a victory for Eyeo, the Hamburg District Court has dismissed the case.

    adblock plusIn order to finance their operations, millions of websites rely on advertising to generate revenue. For some readers, however, excessive or obtrusive advertising is something to be combatted, often through the use of adblocking tools.`,
    source:
      'https://torrentfreak.com/adblocking-does-not-constitute-copyright-infringement-court-rules-220118/',
    user_id: 2
  },
  {
    post_title: '',
    post_content: ``,
    source: '',
    user_id: 3
  },
  {
    post_title:
      'NFT Group Buys Copy Of Dune For €2.66 Million, Believing It Gives Them Copyright',
    post_content: `A group of crypto enthusiasts has made an unusual purchase: a rare copy of Dune, by science fiction writer Frank Herbert, for a staggering €2.66 million ($3.04 million).

   It's an odd occurrence when a book expected to fetch €25,000 goes for 100 times that amount, but the stranger part is that the buyers – a collective called SpiceDAO – appear to believe that owning an early copy of the hit sci-fi about space worms gives them the copyright, to do with what they will. `,
    source:
      'https://www.iflscience.com/technology/nft-group-buys-copy-of-dune-for-266-million-believing-it-gives-them-copyright/',
    user_id: 4
  },
  {
    post_title: 'Crypto Crash Erases More Than $1 Trillion in Market Value',
    post_content: `For Bitcoin, there’s only been one constant recently: decline after decline after decline. And the superlatives have piled up really quickly.

    With the Federal Reserve intending to withdraw stimulus from the market, riskier assets the world over have suffered. Bitcoin, the largest digital asset, lost more than 12% Friday and dropped below $36,000 to its lowest level since July. Since its peak in November, it has lost over 45% of its value. Other digital currencies have suffered just as much, if not more, with Ether and meme coins mired in similar drawdowns. `,
    source:
      'https://www.bloomberg.com/news/articles/2022-01-21/crypto-meltdown-erases-more-than-1-trillion-in-market-value',
    user_id: 5
  }
];

const seedPosts = () => Post.bulkCreate(postdata, { individualHooks: true });

module.exports = seedPosts;
