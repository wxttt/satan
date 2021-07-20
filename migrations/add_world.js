const { models, connectDb } = require('../model');

async function addOwnerToCamp() {
  await connectDb();

  try {
    const campResult = await models.Camp.updateMany({}, { world: '60ec1bd1d82dce3fc89db3b4' });
    const characterResult = await models.Character.updateMany({}, { world: '60ec1bd1d82dce3fc89db3b4' });
    const characterShipResult = await models.CharacterShip.updateMany({}, { world: '60ec1bd1d82dce3fc89db3b4' });
    const characterShipLinkResult = await models.CharacterShipLink.updateMany({}, { world: '60ec1bd1d82dce3fc89db3b4' });

    console.log('campResult is', campResult);
    console.log('characterResult is', characterResult);
    console.log('characterShipResult is', characterShipResult);
    console.log('characterShipLinkResult is', characterShipLinkResult);
  } catch (e) {
    console.log(e);
  }
  process.exit(1);
}

addOwnerToCamp();
