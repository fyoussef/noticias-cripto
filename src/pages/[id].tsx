import axios from "axios"
import { GetStaticPaths, GetStaticProps } from "next"

interface AnnouncementProps {
    announcement: {
        id: number,
        link?: string,
        title?: string,
        content?: string,
        date?: string
    }
}

interface Announcement {
    id: number,
    link?: string,
    title?: string,
    content?: string,
    date?: string
}

export default function Notice(props: AnnouncementProps) {
    const { announcement } = props

    return (
        <div
            className='container mx-auto text-center mt-16 w-1/2'
        >
            <h1 className='text-5xl font-mono font-bold'>
                {announcement.title ?? ''}
            </h1>
            <div 
                dangerouslySetInnerHTML={{__html: announcement.content ?? ''}} 
                className='mt-8'
            />
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const postId = params?.id

    const response_announcement = await axios.get('https://www.bitmex.com/api/v1/announcement')
    const response_urgent_announcement = await axios.get('https://www.bitmex.com/api/v1/announcement/urgent')
    const { data: urgent_announcement } = response_urgent_announcement
    const { data: announcement } = response_announcement
    
    const announcements = [...urgent_announcement, ...announcement]

    const data = announcements.find((announcement: Announcement) => announcement.id.toString() == postId)

    return {
        props: {
            announcement: data
        }
    }

}