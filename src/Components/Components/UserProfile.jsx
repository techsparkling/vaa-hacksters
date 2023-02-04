import "../styles.css";

export default function UserProfile(props) {
  const { name, img_url, title, skillSet } = props;
  // console.log(name,img_url, title, skillSet);
  const skills = skillSet.map((skill) => {
    return (
      <span className="skill_item">
        <img src={skill.icon} alt="logo" />
        <p>{skill.desc}</p>
      </span>
    );
  });
  return (
    <div className="card">
      <div className="profile_desc">
        <div className="heading">
          <h1>{name}</h1>
          <button className="follow_btn">Follow</button>
        </div>
        <h3>{title}</h3>
        <div className="skill_sets">{skills}</div>
      </div>
      <div className="profile_pic">
        <img src={img_url} alt="profile_picture" />
      </div>
    </div>
  );
}
