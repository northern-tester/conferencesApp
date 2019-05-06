import {Router} from 'express'
import {Speaker} from '../speaker'

const router = new Router();

router.get('/:action?', async function (req, res) {
  if (req.query.action === "speakers") {
    const count = await Speaker.count({}, function (err) {
    });
    const distinct = await Speaker.distinct('name', function (err) {
    });
    res.json({
      "numberOfSpeakers": count,
      "distinctSpeakers": distinct
    });
  } else {
    res.status(500).send("No parameter")
  }
});

export default router;
