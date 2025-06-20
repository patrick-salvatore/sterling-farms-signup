import { Hono } from 'hono';
import puppeteer, { ConsoleMessage, Page, JSHandle } from 'puppeteer';
import { nextSaturday, add } from 'date-fns';
import chalk from 'chalk';

export function initialize(app: Hono) {
  app.get('/start', async (ctx) => {
    const browser = await puppeteer.launch({
      dumpio: true,
    });
    const page = await browser.newPage();

    page.on('console', async (msg) => {
      const args = msg.args();
      for (let i = 0; i < args.length; ++i) {
        try {
          const val = await args[i].jsonValue();
          console.log('BROWSER LOG:', val);
        } catch (err) {
          console.log(
            'BROWSER LOG (non-serializable):',
            await args[i].toString(),
          );
        }
      }
    });

    // Navigate to a website
    await page.goto(
      'https://sterling.chelseareservations.com/golf/bookingadmin.aspx',
    );

    let el;
    // go to login
    // let el = await page.$('[name=btnLoginNow]');
    // await el?.click();
    // await new Promise((res) => setTimeout(res, 1000));

    // try {
    //   // type in username
    //   await page.$eval(
    //     '[name=txtLogin]',
    //     (e, [login]) => {
    //       (e as HTMLInputElement).value = login!;
    //     },
    //     [process.env.STERLING_FARMS_LOGIN],
    //   );
    // } catch (e) {
    //   console.error('[name=txtLogin] element not found');
    //   return ctx.json({ status: 'failed' });
    // }
    // try {
    //   // type in password
    //   await page.$eval(
    //     '[name=txtPassword]',
    //     (e, [password]) => {
    //       (e as HTMLInputElement).value = password!;
    //     },
    //     [process.env.STERLING_FARMS_PASSWORD],
    //   );
    // } catch (e) {
    //   console.error('[name=txtPassword] element not found');
    //   return ctx.json({ status: 'failed' });
    // }
    // try {
    //   let el = await page.$('[name=btnSubmitNow]');
    //   await el?.click();
    // } catch (e) {
    //   console.error('[name=btnSubmitNow] element not found');
    //   return ctx.json({ status: 'failed' });
    // }
    // await new Promise((res) => setTimeout(res, 1000));

    // try {
    //   // click accept button
    //   el = await page.$('[id=btnAccept]');
    //   await el?.click();
    // } catch (e) {
    //   console.error('[name=btnAccept] element not found');
    //   return ctx.json({ status: 'failed' });
    // }
    // await new Promise((res) => setTimeout(res, 1000));

    try {
      el = await page.$('[name=ddlQuantity]');
      await page.select('[name=ddlQuantity]', '4');
    } catch (e) {
      console.error('[name=ddlQuantity] element not found');
      return ctx.json({ status: 'failed' });
    }

    try {
      el = await page.$('[name=btnDisplay]');
      await el?.click();
    } catch (e) {
      console.error('[name=btnDisplay] element not found');
      return ctx.json({ status: 'failed' });
    }

    try {
      const links = await page.evaluate(() => {
        // @ts-ignore
        return Array.from(document.querySelectorAll('#lblCalendar a')).map(
          (a: any) => ({
            text: a.textContent.trim(),
            id: a.id,
          }),
        );
      });
      const today = new Date();
      const saturday = nextSaturday(today);
      const sunday = add(saturday, { days: 1 });
      const saturdayDate = saturday.getDate();
      const sundayDate = sunday.getDate();

      const saturdayLink = links.find(
        (obj) => Number(obj.text) == saturdayDate,
      );
      const sundayLink = links.find((obj) => Number(obj.text) == sundayDate);

      console.log('Clicking Date Links', [saturdayLink, sundayLink]);

      for (const link of [saturdayLink, sundayLink] as any[]) {
        await page.evaluate((linkId) => {
          document.getElementById(linkId)?.click();
        }, link.id);

        await page.waitForSelector('#lblTimes a');

        const links = await page.$$eval('#lblTimes a', (elements) =>
          elements.map((e) => e.innerHTML),
        );

        console.log(links);
      }

      await browser.close();
      return ctx.json({});
    } catch (e) {
      console.log(e);
      console.error('[name=lblTimes] element not found');
      return ctx.json({ status: 'failed' });
    }
  });
}
