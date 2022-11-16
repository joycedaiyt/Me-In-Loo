import names
import string
import datetime
from tqdm import tqdm
from faker import Faker
from minio import Minio
from coolname import generate
from radar import random_datetime
from random import choices, choice, randrange, randint, sample
from werkzeug.security import generate_password_hash


fake = Faker()
Faker.seed(0)

# Establish connection to MinIO to get image urls
client = Minio(
    endpoint="localhost:9000",
    secure=False,
    access_key="minioadmin",
    secret_key='minioadmin'
    )

first_profilepic = "profile_pics/0.jpg"
prev_profilepic = "profile_pics/0.jpg"
first_post = "posts/0.jpg"
prev_post = "posts/0.jpg"
tag_set = set()

userfile = open('user.csv', 'w')
secretfile = open('secret.csv', 'w')
profilefile = open('profile.csv', 'w')
postfile = open('post.csv', 'w')
reportfile = open('report.csv', 'w')
tagfile = open('tag.csv', 'w')
attachedByfile = open('attachedBy.csv', 'w')


def generateUser(n):
    email =  names.get_full_name().replace(" ", "")+str(n)+"@gmail.com"
    password = ''.join(choice(string.ascii_letters) for i in range(10))

    # Points are generated by range with a different probability
    possible_points = [(0, 15), (15, 100), (100, 170), (171, 200)]
    prob = [.20, .50, .20, .10]
    [(start, stop)] = choices(possible_points, prob)
    points = str(randrange(start, stop + 1, 1))

    # Write data to file
    userinstance = email+","+generate_password_hash(password)+","+points+"\n"
    secretinstance = email +","+password+"\n"

    return (email, userinstance, secretinstance)


profilefirst = True

def generateProfile(user_email):
    global prev_profilepic
    global first_profilepic
    global profilefirst

    # profiles can have no profile pic
    have = [True, False]
    weights = [0.7, 0.3]
    have_profile_pic = choices(have, weights)[0]


    if profilefirst and have_profile_pic:
        profile_pic_url = "http://localhost:9000/me-in-loo/"+first_profilepic
        profilefirst = False
    
    else:
        objects = client.list_objects("me-in-loo", prefix="profile_pics/", recursive=True, start_after=prev_profilepic)

        profile_pic_url = "None"
        
        for obj in objects:
            if have_profile_pic:
                profile_pic_url = "http://localhost:9000/me-in-loo/"+ obj.object_name
                prev_profilepic = obj.object_name
            
            break

    # profiles can have no profile description
    have_description = choices(have, weights)[0]

    if have_description:
        profile_description = fake.paragraph(nb_sentences=1)
    else:
        profile_description = "None"
    
    # post_counts are generated by range with a different probability
    possible_counts = [(0, 0), (1, 3), (3, 5), (5, 300)]
    prob = [.35, .50, .10, .05]
    [(start, stop)] = choices(possible_counts, prob)
    post_count = randrange(start, stop + 1, 1)

    profileinstance = [user_email, profile_pic_url, profile_description, post_count]

    return profileinstance


postfirst = True

def generatePost(user_email):
    global prev_post
    global first_post
    global report_count
    global postfirst

    # get post url
    if postfirst:
        post_url = "http://localhost:9000/me-in-loo/"+ first_post
        postfirst = False
    else:
        objects = client.list_objects("me-in-loo", prefix = "posts/", recursive=True, start_after=prev_post)
        post_url = "None"
        
        for obj in objects:
            post_url = "http://localhost:9000/me-in-loo/"+ obj.object_name
            prev_post = obj.object_name
            break

    # generate random post name
    post_name = generate()[0]

    # generate random update_date
    update_date = random_datetime(start = datetime.datetime(year=2020, month=5, day=24))

    # get download, like, and cost counts
    download_count = str(randint(0, 1000))
    like_count = str(randint(0, 1000))
    cost = str(randint(1, 100))

    # generate report count given a range and associated probability
    possible_reports = [(0, 0), (1, 5), (5, 20), (20, 50)]
    prob = [.70, .20, .07, .03]
    [(start, stop)] = choices(possible_reports, prob)
    report_count = randrange(start, stop + 1, 1)

    postinstance = [user_email, post_url, post_name, update_date, 
                    download_count, like_count, cost, report_count]
    
    return postinstance


def generateReport(user_email, post_url, post_date):
    # report can have no description
    have = [True, False]
    weights = [0.7, 0.3]
    have_description = choices(have, weights)[0]

    if have_description:
        report_description = fake.paragraph(nb_sentences=1)
    else:
        report_description = "None"
    
    # create_date for the report
    create_date = str(random_datetime(start = post_date))

    reportinstace = user_email+","+post_url+","+report_description+","+create_date+"\n"

    return reportinstace


def generateTag(n):
    # generate random tag category
    category = generate()[0]
    while category in tag_set:
        category = generate()[0]
    
    tag_set.add(category)
    taginstance = str(n)+","+category+"\n"

    return taginstance


def generateAttachedBy(post_url, n):
    arrachedByinstance = ""
    tag_ids = sample(range(1, n), 3)

    for tag_id in tag_ids:
        arrachedByinstance += post_url+","+str(tag_id)+"\n"
    
    return arrachedByinstance


def generateDataset(n):
    user_emails = []
    userinstances = ""
    secretinstances = ""
    profileinstances = ""
    postinstances = ""
    taginstances = ""
    attachedByinstances = ""
    reportinstances = ""

    # generate user and tag table
    for curr in tqdm(range(1, n+1)):
        userdata = generateUser(curr)
        user_email = userdata[0]
        user_emails.append(user_email)
        userinstances += userdata[1]
        secretinstances += userdata[2]
        taginstances += generateTag(curr)
    
    # write to tables
    userfile.write(userinstances)
    secretfile.write(secretinstances)
    tagfile.write(taginstances)

    for user_email in tqdm(user_emails):
        # generate profile table
        profiledata = generateProfile(user_email)
        post_count = profiledata[3]

        postnum = 0

        # generate post table
        for _ in range(post_count):
            postdata = generatePost(user_email)
            report_count = postdata[7]
            post_url = postdata[1]
            post_date = postdata[3]

            if post_url == "None":
                break

            # generate attachedBy table
            attachedByinstances += generateAttachedBy(post_url, n-1)

            # print("report: " + str(report_count))
            # generate Report table
            reporterIdx = randint(0, n-report_count-1)
            for _ in range(report_count):
                if user_emails[reporterIdx] == user_email:
                    reporterIdx += 1

                reportinstances += generateReport(user_emails[reporterIdx], post_url, post_date)
                reporterIdx += 1

            postinstances += (postdata[0]+","+postdata[1]+","+postdata[2]+","+str(postdata[3])+","+
                            postdata[4]+","+postdata[5]+","+postdata[6]+","+str(postdata[7])+"\n")
            postnum += 1
        
        profileinstances += profiledata[0]+","+profiledata[1]+","+profiledata[2]+","+str(postnum)+"\n"
    
    profilefile.write(profileinstances)
    postfile.write(postinstances)
    attachedByfile.write(attachedByinstances)
    reportfile.write(reportinstances)



if __name__ == "__main__":
    generateDataset(1000)
    userfile.close()
    secretfile.close()
    profilefile.close()
    postfile.close()
    reportfile.close()
    tagfile.close()
    attachedByfile.close()
