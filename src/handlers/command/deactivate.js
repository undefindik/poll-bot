import USER_MESSAGES from "../../messages/user.messages.js";
import {InlineKeyboard} from "grammy";
import {supabase as database} from "../../database.js";

const deactivateCommand = async (ctx) => {
    const {data} = await database
        .from('users')
        .select("*")
        .eq('telegram_id', ctx.from.id)
        .single()


    console.log(data)

    if (data?.is_verification) {
        await ctx.reply(
            USER_MESSAGES.warningDeactivate(), {
                parse_mode: "HTML",
                reply_markup: new InlineKeyboard()
                    .text("Да", "deactivate_verification_yes")
                    .row()
                    .text("Нет", "deactivate_verification_no")
            }
        )
    } else {
        await ctx.reply("Вы не верифицированы")
    }
}

export default deactivateCommand;