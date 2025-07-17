export type RoleID = 'admin' |
  'wiki_admin' |
  'bbs_admn' |
  'gallery_admin' |
  'review_admin'

export interface Role {
  id: RoleID
  label: string
  description: string
}

export type PropID = 'blind_box'

export interface Prop {
  id: PropID
  label: string
  description: string
}

export type GameID = 'minecraft_bedrock' |
  'minecraft_java' |
  'dont_starve' |
  'terraria' |
  'stardew_valley' |
  'palworld' |
  'ark_survival_evolved'

export interface Game {
  id: GameID
  label: string
  description: string
}

export type GenderID = 'unknown_gender' |
  'male' |
  'female' |
  'femboy'

export interface Gender {
  id: GenderID
  label: string
}

export type GuildStatusID = 'guild_blocked' |
  'guild_applicant' |
  'guild_member' |
  'guild_admin'

export interface GuildStatus {
  id: GuildStatusID
  label: string
}

export interface User {
  id: number
  createdAt: Date
  updatedAt: Date
  name: string
  exp: number
  password: string
  genderId: GenderID
  gender: Gender
  profile: string
  birthday: Date
  location: string
  dailyCoin: number
  honorCoin: number
  checkin: number
  email: string
  qq: string | null
  mcbeName: string | null
  mcjeName: string | null
  setting: Record<string, any>
  followingCount: number
  followerCount: number
}

export interface Guild {
  id: number
  createdAt: Date
  updatedAt: Date
  name: string
  slug: string
  userCount: number
  profile: string
  notice: string
  money: number
}

export interface DocGroup {
  id: number
  label: string
  slug: string
  sort: number
  docs: Doc[]
}

export interface ForumGroup {
  id: number
  label: string
  slug: string
  sort: number
  forums: Forum[]
}

export interface Good {
  id: number
  propId: PropID
  prop: Prop
  label: string
  count: number
  price: number
}

export interface Server {
  id: number
  slug: string
  label: string
  path: string
  port: number
  description: string
  gameId: GameID
  game: Game
  backupEnable: boolean
  backupPath: string
  backupCron: string
  backupLimit: number
  meta: Record<string, any>
}

export interface UserGuild {
  id: number
  createdAt: Date
  userId: number
  user: User
  guildStatusId: GuildStatusID
  guildStatus: GuildStatus
  guildId: number
  guild: Guild
}

export interface UserFollow {
  id: number
  createdAt: Date
  followerId: number
  follower: User
  followingId: number
  following: User
}

export interface Donation {
  id: number
  createdAt: Date
  amount: number
  userId: number | null
  user: User | null
  message: string
}

export interface UserRole {
  id: number
  createdAt: Date
  userId: number
  user: User
  roleId: RoleID
  role: Role
}

export interface Doc {
  id: number
  createdAt: Date
  updatedAt: Date
  slug: string
  title: string
  docGroupId: number
  docGroup: DocGroup
  userId: number
  user: User
  content: string
  sort: number
  reviewCount: number
}

export interface Album {
  id: number
  createdAt: Date
  updatedAt: Date
  userId: number
  user: User
  guildId: number | null
  guild: Guild | null
  slug: string
  label: string
  profile: string
  pinned: boolean
  hide: boolean
  protected: boolean
  imageCount: number
  reviewCount: number
  images: Image[]
}

export interface File {
  id: number
  createdAt: Date
  name: string
  userId: number
  user: User
  description: string
}

export interface Review {
  id: number
  updatedAt: Date
  content: string
  attitude: boolean | null
  userId: number
  user: User
  reviewableId: number
  reviewableType: string
  reviewCount: string
}

export interface UserProp {
  id: number
  updatedAt: Date
  propId: PropID
  prop: Prop
  userId: number
  user: User
  count: number
}

export interface Log {
  id: number
  createdAt: Date
  path: string
  method: string
  status: number
  userId: number | null
  user: User | null
  message: string
}

export interface DeepSeekMessage {
  id: number
  createdAt: Date
  userId: number
  user: User
  role: string
  content: string
}

export interface Online {
  id: number
  time: Date
  serverId: number
  server: Server
  count: number
}

export interface Image {
  id: number
  createdAt: Date
  filename: string
  label: string
  likes: number
  userId: number
  user: User
  albumId: number
  album: Album
}

export interface Forum {
  id: number
  forumGroupId: number
  forumGroup: ForumGroup
  slug: string
  title: string
  subTitle: string
  profile: string
  postCount: number
  sort: number
  serverId: number | null
  server: Server | null
  posts: Post[]
}

export interface Post {
  id: number
  createdAt: Date
  updatedAt: Date
  pinned: boolean
  title: string
  slug: string
  forumId: number
  forum: Forum
  content: string
  markdown: boolean
  userId: number
  user: User
  reviewCount: number
  reviews: Review[]
}
