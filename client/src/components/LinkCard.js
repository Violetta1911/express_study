export const LinkCard = ({ link }) => {
    return <>
        <h2>Link</h2>
        <p>
            Your link <a href={link.from}>{link.to}</a>
        </p>
        <p>
            created on {link.date}
        </p>
        <p>Statistics: {link.clicks} clicks</p>
    </>
}
